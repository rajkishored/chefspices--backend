const AppDataSource = require("../data-source");
const User = require("../entities/User"); // if you use require for your entity
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { name,email,phone, password,roleId } = req.body;
  console.log("ggg");
  

  if (!name || !email  || !phone ||  !password  ||  !roleId ) return res.status(400).json({ message: "Every Field is required" });

  try {
    const userRepo = AppDataSource.getRepository("User");
     const roleRepo = AppDataSource.getRepository("Role");


    // Check if role already exists
    const existingEmail = await userRepo.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "email already exists" });
    }
    const existingPhone = await userRepo.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(400).json({ message: "phone already exists" });
    }
      const role = await roleRepo.findOne({ where: { id: roleId } });
      console.log(role,"ss");
      
    if (!role) {
      return res.status(400).json({ message: "Invalid roleId" });
    } 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({ name,email,phone,password:hashedPassword,  role: { id: roleId },  });
    await userRepo.save(user);

    res.status(201).json({ message: "user created successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
   const userRepo = AppDataSource.getRepository("User");
    const users = await userRepo.find({ relations: ["sales"] });
    // console.log(users);
    
    res.json({ users });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

module.exports = { createUser, getUser };
