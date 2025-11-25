import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./controller/users/index.js";

const app = express();
const port  = process.env.PORT;

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg : `test API`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : error} )
    }
})
app.use("/users",userRouter) 
app.listen(port , ()=>{
    console.log(`server running at http://localhost:${port}`);
})