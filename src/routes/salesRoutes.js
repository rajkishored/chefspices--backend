const express = require("express");
const {
  createSales,
  getSales,
  getSalesByUserId
} = require("../controllers/salesController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sales Management endpoints
 */

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sales entry
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - city
 *               - dob
 *               - aadhaarNo
 *               - panNo
 *               - userId
 *             properties:
 *               address:
 *                 type: string
 *                 example: "7c/88 2nd cross Kollegal"
 *               city:
 *                 type: string
 *                 example: "Kollegal"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-10"
 *               aadhaarNo:
 *                 type: string
 *                 example: "123456789012"
 *               panNo:
 *                 type: string
 *                 example: "ABCDE1234F"
 *               userId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Sales created successfully
 *       400:
 *         description: Sales already exists
 */
router.post("/", createSales);

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: List of sales
 */
router.get("/", getSales);


/**
 * @swagger
 * /api/sales/by-userId:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get sales  by user
 *     tags: [Sales]
 *     parameters:
 *       - in: query
 *         name: User_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: user ID
 *     responses:
 *       200:
 *         description: sales for userId
 *       404:
 *         description: Sales not found
 */
router.get("/by-userId", authenticateToken, getSalesByUserId);


module.exports = router;
