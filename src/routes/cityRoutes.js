const express = require("express");
const {
  createCity,
  getCity,
  getRouteByCityId,
  getAllCity,
  updateCity
} = require("../controllers/cityController");

const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: City
 *   description: City Management endpoints
 */

/**
 * @swagger
 * /api/city:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new City
 *     tags: [City]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - district_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kollegal"
 *               district_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: City created successfully
 *       400:
 *         description: City already exists or invalid district
 */
router.post("/", authenticateToken, createCity);


/**
 * @swagger
 * /api/city:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: update  City
 *     tags: [City]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "city1"
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: City updated successfully
 *       400:
 *         description: City already exists or invalid district
 */
router.put("/", authenticateToken, updateCity);

/**
 * @swagger
 * /api/city/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all cities
 *     tags: [City]
 *     responses:
 *       200:
 *         description: List of cities
 */
router.get("/all", authenticateToken, getAllCity);

/**
 * @swagger
 * /api/city:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all cities or filter by district_id
 *     tags: [City]
 *     parameters:
 *       - in: query
 *         name: district_id
 *         schema:
 *           type: integer
 *         description: Filter cities by district ID
 *     responses:
 *       200:
 *         description: List of cities
 */
router.get("/", authenticateToken, getCity);

/**
 * @swagger
 * /api/city/by-city:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all routes for a specific city
 *     tags: [City]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: City ID
 *     responses:
 *       200:
 *         description: List of routes for the given city
 *       404:
 *         description: Routes not found
 */
router.get("/by-city", authenticateToken, getRouteByCityId);

module.exports = router;
