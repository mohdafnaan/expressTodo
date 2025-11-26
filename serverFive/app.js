import express from "express";
import dotenv from "dotenv";
import userRouter from "./controller/users/index.js"
dotenv.config();

const app = express();
app.use(express.json())
const port = process.env.PORT;

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg : ` server is live  !`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error});
    }
})
app.use("/users",userRouter);

app.listen(port,()=>{
    console.log(`server running at http://localhost${port}`);
})