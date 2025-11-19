const express = require("express");
const { createPlaces, getPlaces } = require("../controllers/placeController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Place
 *   description: Place Management endpoints
 */

/**
 * @swagger
 * /api/place:
 *   post:
 *     summary: Create a new Place
 *     tags: [Place]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - route_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "SubRoute1"
 *               description:
 *                 type: string
 *                 example: "Demo place description"
 *               route_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Place created successfully
 *       400:
 *         description: Place already exists
 */
router.post("/", createPlaces);

/**
 * @swagger
 * /api/place:
 *   get:
 *     summary: Get all places or filter by place_id
 *     tags: [Place]
 *     responses:
 *       200:
 *         description: List of places
 */
router.get("/", getPlaces);

module.exports = router;
