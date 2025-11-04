const express = require("express");
const cors = require("cors");
require("dotenv").config();
const AppDataSource = require("./data-source");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const path = require("path");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chefspices REST API",
      version: "1.0.0",
      description: "API documentation for Chefspices platform",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "/routes/*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/auth", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auths", authRoutes);
app.use("/api/roles", roleRoutes);


const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Database connection error:", err));
