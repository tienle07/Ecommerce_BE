const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const { createTokenPair } = require("../auth/authUtils")
const KeyTokenService = require("./keyToken.service")
const { getInfoData } = require("../utils")
const { BadRequestError, ConflictRequestError, AuthFailureError } = require("../core/error.response")
const { findByEmail } = require("../routes/shop/shop.service")

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    /*
    1 - check email in dbs
    2 - match password
    3 - create access token vs refresh token
    4 - generate tokens
    5 - get data return login
    */
    static login = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail({ email });
        //1.
        if (!foundShop)
            throw new BadRequestError('Shop not registered');
        //2.
        const match = bcrypt.compare(password, foundShop.password);
        if (!match) throw new AuthFailureError('Authentication error');
        //3.
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        // 4.
        const { _id: userId } = foundShop;
        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey);

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId,
        })

        return {
            metedata: {
                shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
                tokens
            }
        }

    }


    static signUp = async ({ name, email, password }) => {
        try {
            // step 1: check email exists ??
            const holderShop = await shopModel.findOne({ email }).lean();

            if (holderShop) {
                throw new BadRequestError('Error: Shop already registered')
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            });

            if (newShop) {

                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');


                console.log({ privateKey, publicKey });//save collection KeyStore

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });

                if (!keyStore) {
                    return {
                        code: 'xxxx',
                        message: 'keyStore error',
                    }
                }

                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);
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
            console.log('Error sign up', error)
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;