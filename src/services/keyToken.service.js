"use strict";

const { Types } = require("mongoose");
const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey,
        refreshToken,
    }) => {
        try {
            const filter = { user: userId },
                update = {
                    publicKey,
                    privateKey,
                    refreshTokensUsed: [],
                    refreshToken,
                },
                options = {
                    upsert: true,
                    new: true,
                };
            const tokens = await keytokenModel.findOneAndUpdate(
                filter,
                update,
                options
            );

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };

    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({ user: new Types.ObjectId(userId) });
    };

    static removeKeyById = async ({ id }) => {
        const result = await keytokenModel.deleteOne({
            _id: new Types.ObjectId(id)
        })
        return result;
    };

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshTokensUsed: refreshToken }).lean();
    };

    static findByRefreshToken = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshToken });
    };


    static deleteKeyById = async (userId) => {
        return await keytokenModel.deleteOne({ user: new Types.ObjectId(userId) });
    };
}

module.exports = KeyTokenService;
