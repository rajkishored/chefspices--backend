const express = require("express");
const {
  createRoute,
  getRoute,
  getPlaceByRouteId,
} = require("../controllers/routeController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Route
 *   description: Route Management endpoints
 */

/**
 * @swagger
 * /api/route:
 *   post:
 *     summary: Create a new route
 *     tags: [Route]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - city_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Route 1"
 *               city_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Route already exists
 */
router.post("/", createRoute);

/**
 * @swagger
 * /api/route/get:
 *   get:
 *     summary: Get all routes
 *     tags: [Route]
 *     responses:
 *       200:
 *         description: List of routes
 */
router.get("/get", getRoute);

/**
 * @swagger
 * /api/route/place-by-routeid:
 *   get:
 *     summary: Get all places for specif route
 *     tags: [Route]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Route Id
 *     responses:
 *       200:
 *         description: List of places for the given route
 *       404:
 *         description: place not found
 */

router.get("/place-by-routeid", getPlaceByRouteId);

module.exports = router;
