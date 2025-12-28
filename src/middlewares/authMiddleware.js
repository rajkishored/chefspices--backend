const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
         console.log("SECRET USED:", process.env.JWT_SECRET);
    console.log("VERIFY ERROR:", err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const generateToken  =async(id,role,phone)=>{
    const token =  jwt.sign({id,role,phone},process.env.JWT_SECRET,{expiresIn:"5d"});
    return token;
}

module.exports = { authenticateToken ,generateToken};