const express = require("express");
const { createRole, getRoles } = require("../controllers/roleController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleName
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Role already exists
 */
router.post("/", createRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get("/", getRoles);

module.exports = router;
