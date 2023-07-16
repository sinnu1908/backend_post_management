const express=require("express");
const { registerUser, loginUser, logOutUser } = require("../controllers/users.controller");


const userRoutes=express.Router();


userRoutes.post("/register",registerUser)
userRoutes.post("/login",loginUser);
userRoutes.get("/logout",logOutUser);

module.exports=userRoutes;