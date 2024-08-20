const express = require('express');
const accessController = require('../../controllers/auth.controller');
const { authentication, authenticationV2 } = require('../../auth/authUtils');
const asyncHandler = require('../../helpers/asyncHandler');

const router = express.Router();

/**
 * @swagger
 * /shop/signup:
 *   post:
 *     summary: Register a new shop account
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               shopName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account successfully created
 *       400:
 *         description: Bad request
 */
router.post('/shop/signup', asyncHandler(accessController.signUp));

/**
 * @swagger
 * /v1/api/shop/login:
 *   post:
 *     summary: Login to the shop account
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized
 */
router.post('/shop/login', asyncHandler(accessController.login));

// authentication middleware
router.use(authenticationV2);

/**
 * @swagger
 * /shop/logout:
 *   post:
 *     summary: Logout from the shop account
 *     tags: 
 *       - Authentication
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 */
router.post('/shop/logout', asyncHandler(accessController.logout));

/**
 * @swagger
 * /shop/handlerRefreshToken:
 *   post:
 *     summary: Handle refresh token to obtain a new access token
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully obtained new access token
 *       401:
 *         description: Unauthorized
 */
router.post('/shop/handlerRefreshToken', asyncHandler(accessController.handlerRefreshToken));

module.exports = router;
