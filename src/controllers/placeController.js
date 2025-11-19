const AppDataSource = require("../data-source");
const Place = require("../entities/Place"); // if you use require for your entity

const createPlaces = async (req, res) => {
  const { name, description, route_id } = req.body;

  if (!name || !route_id)
    return res.status(400).json({ message: "Place name  is required" });

  try {
    const placeRepo = AppDataSource.getRepository("Place");
    const routeRepo = AppDataSource.getRepository("Route");

    const route = await routeRepo.findOne({ where: { id: route_id } });
    if (!route) {
      return res.status(400).json({ message: "Invalid route_id" });
    }

    const existingRole = await placeRepo.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: "place already exists" });
    }

    const place = placeRepo.create({ name, description, route });
    await placeRepo.save(place);

    res.status(201).json({ message: "place created successfully", place });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating role", error: err.message });
  }
};

const getPlaces = async (req, res) => {
  try {
    const placeRepo = AppDataSource.getRepository("Place");
    const place = await placeRepo.find();
    res.json({ place });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching roles", error: err.message });
  }
};

module.exports = { createPlaces, getPlaces };
