const { postModel } = require("../models/posts.model");

//Adding posts
const addPosts=async(req,res)=>{
    const {title,body,device,no_of_comments}=req.body;

    try {
        if(!title||!body||!device||!no_of_comments){
            res.status(200).json({msg:"Please fill all the required fields"})
        }else{
            
            const newPost=await new postModel(req.body);
            await newPost.save();
            res.status(201).json({msg:"Post added successfully",post:{title,body,device,no_of_comments}})
        } 
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error})
    }

  
}

//Getting posts

const getPosts=async(req,res)=>{
    const {userId}=req.body;
    const {page,limit,minComments,maxComments,device1,device2}=req.query;


    const skip=limit*(page-1);
    const query={};

    if(userId){
        query.userId=userId;

        if(minComments && maxComments){
            query.$and=
                [
                    {no_of_comments:{$gte:minComments}},
                    {no_of_comments:{$lte:maxComments}}
                ]
            
        }

        if(device1 && device2){
            query.$or=
                [
                    {device:device1},
                    {device:device2}
                ]
            
        }else if(device1){
            query.device=device1;
        }
    }
    
console.log(query);

    try {

    //    const posts=await postModel.find(query).skip(skip).limit(limit)

    // const posts=await postModel.find({userId,$or:[{device:device1},{device:device2}]});

    
    const posts=await postModel.find(query).sort({no_of_comments:1}).skip(skip).limit(limit);

        res.status(200).json({posts:posts});

        
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error})
    }
}

//top posts

const topPosts=async(req,res)=>{

    const {page,limit}=req.query;
    const {userId}=req.body;

    console.log(page,limit)
    try {

        const userPosts=await postModel.find({userId}).sort({no_of_comments:-1}).skip(limit*(page-1)).limit(limit);
    
        res.status(200).json({posts:userPosts});
    
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error})
    }
}

//update post

const uptPost=async(req,res)=>{

    const {userId,no_of_comments}=req.body;
    const {id}=req.params;

    try {

        const postInDB=await postModel.findOne({_id:id});
        const postDBUserId=postInDB.userId;
        const authUserId=userId;

        if(authUserId===postDBUserId){
            await postModel.findByIdAndUpdate({_id:id},{no_of_comments});
            const updatedPost=await postModel.findOne({_id:id});

            res.status(201).json({msg:"Post updated successfully",updatedPost})
        }else{
            res.status(401).json({msg:"User is not authorized to update the post"})

        }
        
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error})
    }
}


//delete post 

const dltPost=async(req,res)=>{

    const {userId}=req.body;
    const {id}=req.params;

    try {
     
        const postInDB=await postModel.findOne({_id:id});

        console.log(postInDB);

        const postInDBUserId=postInDB.userId;

        if(postInDBUserId===userId){
          
            await postModel.findByIdAndDelete({_id:id});

            res.status(200).json({msg:"Post deleted successfull", deletedPost:userIdInDataBPost})

        }else{
            res.status(401).json({msg:"User is not authorized to delete post"})
        }

        
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error})
    }
}



module.exports={
    addPosts,
    getPosts,
    topPosts,
    dltPost,
    uptPost,
}