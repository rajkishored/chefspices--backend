const AppDataSource = require("../data-source");
const Route = require("../entities/Route"); // if you use require for your entity

const createRoute = async (req, res) => {
  const { name, city_id } = req.body;

  if (!name || !city_id)
    return res.status(400).json({ message: "Route name is required" });

  try {
    const routeRepo = AppDataSource.getRepository("Route");
    const cityRepo = AppDataSource.getRepository("City");

    const city = await cityRepo.findOne({ where: { id: city_id } });
    if (!city) {
      return res.status(400).json({ message: "Invalid city_id" });
    }

    const existingRole = await routeRepo.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: "Route already exists" });
    }

    const route = routeRepo.create({ name, city });
    await routeRepo.save(route);

    res.status(201).json({ message: "route created successfully", route });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating route", error: err.message });
  }
};

const getRoute = async (req, res) => {
  try {
    const routeRepo = AppDataSource.getRepository("Route");
    const route = await routeRepo.find();
    res.json({ route });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching route", error: err.message });
  }
};

const getPlaceByRouteId = async (req, res) => {
  try {
    const { id } = req.query;

    const routeRepo = AppDataSource.getRepository("Route");
    const placeRepo = AppDataSource.getRepository("Place");

    const route = await routeRepo.findOne({
      where: { id: parseInt(id) },
    });

    if (!route) {
      return res.status(404).json({ message: "route not found" });
    }

    const places = await placeRepo.find({
      where: { route: { id: route.id } },
      relations: ["route"],
    });
    res.status(200).json({
      route: route.name,
      totalPlaces: places.length,
      places,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching routes", error: err.message });
  }
};

module.exports = { createRoute, getRoute, getPlaceByRouteId };
