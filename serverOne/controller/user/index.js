import readContent from "../../utils/helper.js";
import express from "express";

const router = express.Router();

router.get("/fetch",async (req,res)=>{
    try {
        let userData = await readContent();
        console.log(userData);
        res.status(200).json(userData)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

export default router;