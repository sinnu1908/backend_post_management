const express=require("express");
const { addPosts, getPosts, topPosts, dltPost, uptPost } = require("../controllers/posts.controller");
const auth = require("../middlewares/auth.middleware");

const postRoutes=express.Router();

postRoutes.use(auth);

postRoutes.post("/add",addPosts);
postRoutes.get("/",getPosts);
postRoutes.get("/top",topPosts);
postRoutes.delete("/delete/:id",dltPost);
postRoutes.patch("/update/:id",uptPost)


module.exports=postRoutes;