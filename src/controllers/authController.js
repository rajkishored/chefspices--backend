const AppDataSource = require("../data-source");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  const { name, email, roleName } = req.body;
  try {
    const userRepo = AppDataSource.getRepository("User");
    const roleRepo = AppDataSource.getRepository("Role");

    let role = await roleRepo.findOne({ where: { name: roleName } });
    if (!role) {
      role = roleRepo.create({ name: roleName });
      await roleRepo.save(role);
    }

    const password = "vvvv@123";
    const user = userRepo.create({ name, email, password, role });
    await userRepo.save(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error registering user", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRepo = AppDataSource.getRepository("User");
    const user = await userRepo.findOne({
      where: { email },
      relations: ["role"],
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role.name });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { register, login };
