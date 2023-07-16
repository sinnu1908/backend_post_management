const mongoose=require("mongoose");

const postSchema=mongoose.Schema({

    title:{type:String,required:[true,"title is required"]},
    body:{type:String,required:[true,"body is required"]},
    device:{type:String,required:[true,"device is required"]},
    no_of_comments:{type:Number,required:[true,"no_of_comments is required"]},
    userName:{type:String},
    userId:{type:String}
});


const postModel=mongoose.model("post",postSchema);


module.exports={
    postModel
}



