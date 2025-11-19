const express = require("express");
const {
  createCity,
  getCity,
  getRouteByCityId,
  getAllCity,
} = require("../controllers/cityController");

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
router.post("/", createCity);

/**
 * @swagger
 * /api/city/all:
 *   get:
 *     summary: Get all cities
 *     tags: [City]
 *     responses:
 *       200:
 *         description: List of city
 */
router.get("/all", getAllCity);

/**
 * @swagger
 * /api/city:
 *   get:
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
router.get("/", getCity);

/**
 * @swagger
 * /api/city/by-city:
 *   get:
 *     summary: Get all routes for specif city
 *     tags: [City]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: City Id
 *     responses:
 *       200:
 *         description: List of routes for the given city
 *       404:
 *         description: routes not found
 */

router.get("/by-city", getRouteByCityId);

module.exports = router;
