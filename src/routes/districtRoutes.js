const express = require("express");
const {
  createDistrict,
  getDistrict,
  getCityByDistrictId,
} = require("../controllers/districtController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: District
 *   description: District Management endpoints
 */

/**
 * @swagger
 * /api/district:
 *   post:
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
 *         description:  district successfully
 *       400:
 *         description: district already exists
 */
router.post("/", createDistrict);

/**
 * @swagger
 * /api/district/get:
 *   get:
 *     summary: Get all district
 *     tags: [District]
 *     responses:
 *       200:
 *         description: List of district
 */
router.get("/get", getDistrict);

/**
 * @swagger
 * /api/district/by-district:
 *   get:
 *     summary: Get all cities for a specific district
 *     tags: [District]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: District ID
 *     responses:
 *       200:
 *         description: List of cities for the given district
 *       404:
 *         description: District not found
 */

router.get("/by-district", getCityByDistrictId);

module.exports = router;
