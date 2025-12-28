const express = require("express");
const {
  createRoute,
  getRoute,
  getPlaceByRouteId,
  assignRouteToSales,
  removeRouteFromSales,
  updateRoute
  
} = require("../controllers/routeController");

const { authenticateToken } = require("../middlewares/authMiddleware");

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
 *     security:
 *       - bearerAuth: []
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
router.post("/", authenticateToken, createRoute);

/**
 * @swagger
 * /api/route:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a route
 *     tags: [Route]
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
 *                 example: "Route 1"
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Route updated successfully
 *       400:
 *         description: Route already exists
 */
router.put("/", authenticateToken, updateRoute);


/**
 * @swagger
 * /api/route/get:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all routes
 *     tags: [Route]
 *     responses:
 *       200:
 *         description: List of routes
 */
router.get("/get", authenticateToken, getRoute);

/**
 * @swagger
 * /api/route/place-by-routeid:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all places for a specific route
 *     tags: [Route]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Route ID
 *     responses:
 *       200:
 *         description: List of places for the given route
 *       404:
 *         description: Places not found
 */
router.get("/place-by-routeid", authenticateToken, getPlaceByRouteId);


/**
 * @swagger
 * /api/route/assigntoSalesMan:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Assign routes to salesMan
 *     tags: [Route]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - route_id
 *               - user_id
 *             properties:
 *               route_id:
 *                 type: integer
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: route assigned to user successfully
 *       400:
 *         description:  already assigned
 */
router.post("/assigntoSalesMan", authenticateToken, assignRouteToSales);


/**
 * @swagger
 * /api/route/removetoSalesMan:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove routes from   salesMan
 *     tags: [Route]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - route_id
 *               - user_id
 *             properties:
 *               route_id:
 *                 type: integer
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: route assigned to user successfully
 *       400:
 *         description:  already assigned
 */
router.post("/removetoSalesMan", authenticateToken, removeRouteFromSales);



module.exports = router;
