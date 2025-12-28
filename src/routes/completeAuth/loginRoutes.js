const express = require("express");
const { logUser } = require("../../controllers/authCont/completeLogController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Login management endpoints
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:     
 *               - phone
 *               - password      
 *             properties:
 *               phone:
 *                 type: string
 *                 example: 99999998989
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User Login successfully
 *       400:
 *         description: Error occurred
 */
router.post("/", logUser);

module.exports = router;
