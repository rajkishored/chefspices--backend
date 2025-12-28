const AppDataSource = require("../data-source");
const Place = require("../entities/Place"); // if you use require for your entity

const createPlaces = async (req, res) => {
  const { name,order, description, route_id } = req.body;

  if (!name || !route_id || !order)
    return res.status(400).json({ message: "Place name  is required" });

  try {
    const placeRepo = AppDataSource.getRepository("Place");
    const routeRepo = AppDataSource.getRepository("Routee");

    const route = await routeRepo.findOne({ where: { id: route_id } });
    if (!route) {
      return res.status(400).json({ message: "Invalid route_id" });
    }

    const existingRole = await placeRepo.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: "place already exists" });
    }

    const place = placeRepo.create({ name,order, description, route });
    await placeRepo.save(place);

    res.status(201).json({ message: "place created successfully", place });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating role", error: err.message });
  }
};
const  updatePlaces = async (req, res) => {
  const { name,order, description, id } = req.body;

  if (!name || !id || !order || !description)
    return res.status(400).json({ message: " name  is required" });

  try {
    const placeRepo = AppDataSource.getRepository("Place");
    const routeRepo = AppDataSource.getRepository("Routee");


    const place = await placeRepo.findOne({ where: { id } });
    if (!place) {
      return res.status(400).json({ message: "place not exists" });
    }

    place.name =name;
    place.order = order;
    place.description = description;
    await placeRepo.save(place);

    res.status(201).json({ message: "place updated successfully", place });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error upddating role", error: err.message });
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

module.exports = { createPlaces, getPlaces,updatePlaces };
