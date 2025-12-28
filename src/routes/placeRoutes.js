const express = require("express");
const { createPlaces, getPlaces , updatePlaces} = require("../controllers/placeController");
const { authenticateToken } = require("../middlewares/authMiddleware");

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
 *     security:
 *       - bearerAuth: []
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
 *               - order
 *               - description
 *               - route_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "SubRoute1"
 *               order:
 *                 type: integer
 *                 example: 1
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
router.post("/", authenticateToken, createPlaces);

/**
 * @swagger
 * /api/place:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: update Place
 *     tags: [Place]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - order
 *               - description
 *               - id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "SubRoute1"
 *               order:
 *                 type: integer
 *                 example: 1
 *               description:
 *                 type: string
 *                 example: "Demo place description"
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Place updated successfully
 *       400:
 *         description: Place already exists
 */
router.put("/", authenticateToken, updatePlaces);


/**
 * @swagger
 * /api/place:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all places or filter by place_id
 *     tags: [Place]
 *     responses:
 *       200:
 *         description: List of places
 */
router.get("/", authenticateToken, getPlaces);

module.exports = router;
