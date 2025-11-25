import express from "express";
import dotenv from "dotenv";
import userRouter from "./controller/user/index.js"
dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg : "this is testApi"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : error})
    }
})
app.use("/user",userRouter)
app.listen(port,()=>{
    console.log(`server is running at http://localhost${port}`);
})