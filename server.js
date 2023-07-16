const express=require("express");
require("dotenv").config();
const cors=require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");


const server=express();
server.use(express.json());
server.use(cors());

server.use("/user",userRoutes);
server.use("/posts",postRoutes)



server.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log(`server is connected at ${process.env.port}`);
        console.log("database is connected")
        
    } catch (error) {
        console.log(error)
    }
})