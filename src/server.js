const express = require("express");
const cors = require("cors");
require("dotenv").config();
const AppDataSource = require("./data-source");
// const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const districtRoutes = require("./routes/districtRoutes");
const cityRoutes = require("./routes/cityRoutes");
const routeRoutes = require("./routes/routeRoutes");
const PlaceRoutes = require("./routes/placeRoutes");
const salesRoutes = require("./routes/salesRoutes");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/completeAuth/loginRoutes");

const path = require("path");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { authenticateToken } = require("./middlewares/authMiddleware");

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
apis: [path.join(__dirname, "/routes/**/*.js")],

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api/auth", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.use("/api/auths", authRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/roles",authenticateToken, roleRoutes);
app.use("/api/district",authenticateToken, districtRoutes);
app.use("/api/city",authenticateToken, cityRoutes);
app.use("/api/route",authenticateToken, routeRoutes);
app.use("/api/place",authenticateToken, PlaceRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/users",userRoutes);
app.use("/api/login",loginRoutes);  


const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Database connection error:", err));
