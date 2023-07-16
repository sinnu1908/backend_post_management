
const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    name:{type:String,required:[true,"name is required"]},
    email:{type:String,required:[true,"email is required"]},
    gender:{type:String,required:[true,"gender is required"]},
    password:{type:String,required:[true,"password is required"]},
    age:{type:Number,required:[true,"age is required"]},
    city:{type:String,required:[true,"city is required"]},
    is_married:{type:Boolean,required:[true,"is_married is required"]},
    
})


const userModel=mongoose.model("user",userSchema);

const logoutSchema=mongoose.Schema({
    blToken:{type:String}
})


const logoutUser=mongoose.model("logoutToken",logoutSchema)


module.exports={
    userModel,
    logoutUser,
}