const JWT = require("jsonwebtoken");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { findByUserId } = require("../services/keyToken.service");
const asyncHandler = require('../helpers/asyncHandler');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
};

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: "2 days",
        });

        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days",
        });

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify:: `, err);
            } else {
                console.log(`decode verify:: `, decode);
            }
        });
        return { accessToken, refreshToken };
    } catch (error) {
        console.error(`Error in createTokenPair:`, error);
    }
};

const authentication = asyncHandler(async (req, res, next) => {
    /*
         1 - check userId messing???
         2 - get access token
         3 - verify token
         4 - check user in dbs?
         5 -  check keystore with userId
         6 - Ok all => return next()
      */
    //1.
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError("Invalid Request");
    //2.
    const keyStore = await findByUserId(userId);
    if (!keyStore) throw new NotFoundError("Not Found Keystore");

    //3.
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new AuthFailureError("Invalid Request");

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId)
            throw new AuthFailureError("Invalid userId");
        req.keyStore = keyStore;
        return next();
    } catch (error) {
        console.log('Error authentication:', error)
    }
});

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret);
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT,
};
