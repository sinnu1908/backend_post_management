const bcrypt=require("bcrypt");
const { userModel, logoutUser } = require("../models/users.model");
const jwt=require("jsonwebtoken")
require("dotenv").config();

//Register user

const registerUser=async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body;

try {
    if(!name || !email || !gender || !password || !age || !city || is_married===undefined){

        res.status(200).json({msg:"Please fill all the required fields"})
    }

    else{

        const userAvailable=await userModel.findOne({email});

        if(userAvailable){
           res.status(200).json({msg:"User already registered with us, Please login"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{

                if(err){
                    res.status(400).json({msg:"Something went wrong"})
                }else{
                    const newUser=await userModel({
                        name,email,gender,password:hash,age,city,is_married
                    })
    
                    await newUser.save();
    
                    res.status(201).json({msg:"User registered successfully, Please log in", user:req.body})
                }
            })

        }
    
        
    }
    
} catch (error) {
    console.log(error);
    res.status(400).json({error})
}
    
}


//Login User

const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    try {
        if(!email || !password){
            res.status(200).json({msg:"Please fill all the required fields"})
        }else{
           
            const userAvailable=await userModel.findOne({email});

            if(!userAvailable){
                res.status(200).json({msg:"User is not registered with us. Please register first"})
            }else{

                bcrypt.compare(password, userAvailable.password, function(err, result) {
                    
                    if(err){
                        res.status(200).json({msg:"Something went wrong"})

                    }else if(!result){

                        res.status(200).json({msg:"Password is incorrect"})
                    }else{

                       const token= jwt.sign({
                            userName:userAvailable.name,
                            userId:userAvailable._id
                        },process.env.secreteKey,{expiresIn:"180m"})

                        res.status(200).json({msg:"Login successfull",token})

                    }
                });

            }

        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
}


//logout user

const logOutUser=async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];

    console.log(token);
     
    const newBlT=await new logoutUser({
        blToken:token
    })
     
    await newBlT.save();

    res.status(200).json({msg:"User logged out successfully"})

}


module.exports={
    registerUser,
    loginUser,
    logOutUser,
}