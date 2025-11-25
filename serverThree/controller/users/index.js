import express from "express";
import usersData from "../../utils/helper.js";

const router = express.Router();

router.get("/fetch",async(req,res)=>{
    try {
        let usersDetails = await usersData(); 
        console.log(usersDetails);
        res.status(200).json({ msg : usersDetails})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

export default router;