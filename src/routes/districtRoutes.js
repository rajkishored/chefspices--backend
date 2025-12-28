const express = require("express");
const {
  createDistrict,
  getDistrict,
  getCityByDistrictId,
  updateDistrict
} = require("../controllers/districtController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/district:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new district
 *     tags: [District]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Chamarajanagra"
 *     responses:
 *       201:
 *         description: district successfully
 *       400:
 *         description: district already exists
 */
router.post("/", authenticateToken, createDistrict);

/**
 * @swagger
 * /api/district:
 *    put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update district 
 *     tags: [District]
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
 *                 example: "Chamarajanagra"
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: district updated successfully
 *       400:
 *         description: district already exists
 */
router.put("/", authenticateToken, updateDistrict);


/**
 * @swagger
 * /api/district/get:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all district
 *     tags: [District]
 *     responses:
 *       200:
 *         description: List of district
 */
router.get("/get", authenticateToken, getDistrict);

/**
 * @swagger
 * /api/district/by-district:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all cities for a specific district
 *     tags: [District]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of cities for the given district
 */
router.get("/by-district", authenticateToken, getCityByDistrictId);

module.exports = router;
  