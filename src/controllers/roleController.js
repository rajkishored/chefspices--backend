const AppDataSource = require("../data-source");
const Role = require("../entities/Role"); // if you use require for your entity

const createRole = async (req, res) => {
  const { roleName } = req.body;

  if (!roleName) return res.status(400).json({ message: "Role name is required" });

  try {
    const roleRepo = AppDataSource.getRepository("Role");

    // Check if role already exists
    const existingRole = await roleRepo.findOne({ where: { roleName } });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = roleRepo.create({ roleName  });
    await roleRepo.save(role);

    res.status(201).json({ message: "Role created successfully", role });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating role", error: err.message });
  }
};

const getRoles = async (req, res) => {
  try {
    const roleRepo = AppDataSource.getRepository("Role");
    const roles = await roleRepo.find();
    res.json({ roles });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching roles", error: err.message });
  }
};

module.exports = { createRole, getRoles };
