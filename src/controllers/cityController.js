const AppDataSource = require("../data-source");
const City = require("../entities/City"); // if you use require for your entity
const District = require("../entities/District");

const createCity = async (req, res) => {
  const { name, district_id } = req.body;

  if (!name || !district_id) {
    return res
      .status(400)
      .json({ message: "City name and district_id is required" });
  }

  try {
    const cityRepo = AppDataSource.getRepository("City");
    const districtRepo = AppDataSource.getRepository("District");

    const district = await districtRepo.findOne({ where: { id: district_id } });
    if (!district) {
      return res.status(400).json({ message: "Invalid district_id" });
    }

    // Check if role already exists
    const existingCity = await cityRepo.findOne({ where: { name } });
    if (existingCity) {
      return res.status(400).json({ message: "City already exists" });
    }

    const newCity = cityRepo.create({ name, district });
    await cityRepo.save(newCity);

    res
      .status(201)
      .json({ message: "city created successfully", city: newCity });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating city", error: err.message });
  }
};
const getAllCity = async (req, res) => {
  try {
    const cityRepo = AppDataSource.getRepository("City");
    const city = await cityRepo.find();
    res.json({ city });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching city", error: err.message });
  }
};

const getCity = async (req, res) => {
  try {
    const { district_id } = req.query;
    let cities;

    const cityRepo = AppDataSource.getRepository("City");
    if (district_id) {
      cities = await cityRepo.find({
        where: { district: { id: district_id } },
        relations: ["district"],
      });
    } else {
      cities = await cityRepo.find({ relations: ["district"] });
    }

    res.status(200).json({ cities });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching roles", error: err.message });
  }
};

const getRouteByCityId = async (req, res) => {
  try {
    const { id } = req.query;

    const cityRepo = AppDataSource.getRepository("City");
    const routeRepo = AppDataSource.getRepository("Route");

    const city = await cityRepo.findOne({
      where: { id: parseInt(id) },
    });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    const routes = await routeRepo.find({
      where: { city: { id: city.id } },
      relations: ["city"],
    });
    res.status(200).json({
      city: city.name,
      totalRoutes: routes.length,
      routes,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching routes", error: err.message });
  }
};

module.exports = { createCity, getCity, getRouteByCityId, getAllCity };
