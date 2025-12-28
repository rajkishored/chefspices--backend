const AppDataSource = require("../data-source");
const Sales = require("../entities/Sales"); // if you use require for your entity
const bcrypt = require("bcrypt");

const createSales = async (req, res) => {
  const { address,city,dob, aadhaarNo,panNo ,userId} = req.body;
  console.log("ggsg");
  

  if (!address || !city  || !dob ||  !aadhaarNo  ||  !panNo  ||  !userId ) return res.status(400).json({ message: "Every Field is required" });

  try {
    const userRepo = AppDataSource.getRepository("User");
     const saleRepo = AppDataSource.getRepository("Sales");


    
      const users = await userRepo.findOne({ where: { id: userId } });
      console.log(users,"ss");
      
    if (!users) {
      return res.status(400).json({ message: "user not exist" });
    }


    const sales = saleRepo.create({ address,city,dob,aadhaarNo,  panNo, user:{id : userId} });
    await saleRepo.save(sales);

    res.status(201).json({ message: "user created successfully", sales });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating sales", error: err.message });
  }
};

const getSales = async (req, res) => {
  try {
   const salesRepo = AppDataSource.getRepository("Sales");
    const sales = await salesRepo.find();
    // console.log(users);
    
    res.json({ sales });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

const getSalesByUserId = async (req, res) => {

     const {User_id} = req.query;
     console.log(User_id);
     


  try {

   const userRepo = AppDataSource.getRepository("User");

    const  user = await userRepo.findOne({ where: { id: User_id } });
    console.log("user",user);
    
    if (!user) {
      return res.status(400).json({ message: "Invalid user_id" });
    }


   const salesRepo = AppDataSource.getRepository("Sales");
     const sales = await salesRepo
      .createQueryBuilder("sales")
      .where("sales.userId = :userId", { userId: User_id })
      .getOne();
    // console.log(users);
       if (!sales) {
      return res.status(200).json({ message: "Sales not completed" });
    }

    return res.status(200).json({ sales });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};
module.exports = { createSales, getSales,getSalesByUserId };
