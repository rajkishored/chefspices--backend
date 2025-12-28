require("reflect-metadata");
const { DataSource } = require("typeorm");
require("dotenv").config();

const User = require("./entities/User");
const Role = require("./entities/Role");
const Sales = require("./entities/Sales");
const District = require("./entities/District");
const City = require("./entities/City");
const Routee = require("./entities/Routee");
const Place = require("./entities/Place");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Role, District, City, Routee, Place,Sales],
});

module.exports = AppDataSource;
