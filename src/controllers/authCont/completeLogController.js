const AppDataSource = require("../../data-source");
const User = require("../../entities/User"); // if you use require for your entity
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../../middlewares/authMiddleware");

const logUser = async (req, res) => {
  console.log("ssss");
  
  const { phone,password} = req.body;
  console.log("ggg");
  

  if ( !phone ||  !password   ) return res.status(400).json({ message: "Every Field is required" });

  try {
    const userRepo = AppDataSource.getRepository("User");
     

    // Check if role already exists
    
    const existingPhone = await userRepo.findOne({ where: { phone } });
    if (!existingPhone) {
      return res.status(400).json({ message: "User not exists" });
    }

     const passCheck  = await userRepo.find({where:{
      phone
     }});   
     const getPass= passCheck[0].password;    
     const data = passCheck[0];

     const isMatch =await bcrypt.compare(password,getPass);
     console.log("passs",passCheck[0]);
     console.log(isMatch);
     
     if(!isMatch){ 
      return res.status(401).json({ message: "Invalid password" });
     }
      const token =await generateToken(data.id,data.role.roleName,data.phone);
      if(!token){
        return res.status(500).json({ message: "retry" });
      } 
     
      console.log("SSSS",token);  
      
       res.status(201).json({ message: "user created successfully",data:{tok:token, id:data.id,name:data.name,role:data.role.roleName}});
 
     
     
    
   
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};


module.exports = { logUser };
