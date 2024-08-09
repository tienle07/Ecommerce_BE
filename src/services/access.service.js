const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { createTokenPair } = require("../auth/authUtils")
const KeyTokenService = require("./keyToken.service")
const { getInfoData } = require("../utils")

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step 1: check email exists ??
            const holderShop = await shopModel.findOne({ email }).lean();

            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Email already existed',
                }
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            });

            if (newShop) {
                // created privateKey, publicKey 
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                });

                console.log({ privateKey, publicKey });//save collection KeyStore

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                });

                if (!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'publicKeyString error',
                    }
                }

                console.log(`publicKeyString:`, publicKeyString);

                const publicKeyObject = crypto.createPublicKey(publicKeyString);
                console.log(`publicKeyObject:`, publicKeyObject);


                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey);
                console.log(`Created Token Successfully::`, tokens);

                return {
                    code: 201,
                    metedata: {
                        shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metedata: null
            }
        } catch (error) {
            console.log(error)
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;