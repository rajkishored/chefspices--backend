const AppDataSource = require("../data-source");
const District = require("../entities/District"); // if you use require for your entity

const createDistrict = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ message: "District name is required" });

  try {
    const districtRepo = AppDataSource.getRepository("District");

    // Check if role already exists
    const existingRole = await districtRepo.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: "district already exists" });
    }

    const districtt = districtRepo.create({ name });
    await districtRepo.save(districtt);

    res
      .status(201)
      .json({ message: "district created successfully", districtt });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating district", error: err.message });
  }
};
const updateDistrict = async (req, res) => {
  const { name, id } = req.body;
  console.log("hello");
  

  if (!name || !id)
    return res.status(400).json({ message: "District name and id are required" });
  try {
    const districtRepo = AppDataSource.getRepository("District");

    // Check if role already exists
    const district  = await districtRepo.findOne({ where: { id } });
    if (!district ) {
      return res.status(400).json({ message: "district not found" });
    }
  district.name = name;

  await districtRepo.save(district);
    res
      .status(201)
      .json({ message: "district updated successfully", district});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating district", error: err.message });
  }
};

const getDistrict = async (req, res) => {
  try {
    const districtRepo = AppDataSource.getRepository("District");
    const district = await districtRepo.find();
    res.json(district );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching roles", error: err.message });
  }
};

const  getCityByDistrictId = async (req, res) => {
  try {
    const { id } = req.query;
    const districtRepo = AppDataSource.getRepository("District");
    const cityRepo = AppDataSource.getRepository("City");

    // Check if the district exists
    const district = await districtRepo.findOne({
      where: { id: parseInt(id) },
    });
    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    // Get all cities with this district_id
    const cities = await cityRepo.find({
      where: { district: { id: district.id } },
      relations: ["district"], // Include district info if needed
    });

    res.status(200).json({
      district: district.name,
      totalCities: cities.length,
      cities,
    });
  } catch (error) {
    console.error("Error fetching cities by district:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createDistrict, getDistrict, getCityByDistrictId,updateDistrict };
