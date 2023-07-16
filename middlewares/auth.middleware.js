const jwt=require("jsonwebtoken");
const { logoutUser } = require("../models/users.model");
require("dotenv").config();



const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];

    try {

        if(token){
            const blUser=await logoutUser.findOne({blToken:token});

            if(blUser){
                res.status(200).json({msg:"User is logged out,Please log in"})
            }else{
                
                const decodedT=jwt.verify(token,process.env.secreteKey);

                if(decodedT){
                    req.body.userName=decodedT.userName;
                    req.body.userId=decodedT.userId;
    
                    next();
                }else{

                    res.status(401).json({msg:"User is not authorized, Please log in again"})
                }

                



            }



        }else{

            res.status(401).json({msg:"User is not authorized"})
        }



        
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
}



module.exports=auth;