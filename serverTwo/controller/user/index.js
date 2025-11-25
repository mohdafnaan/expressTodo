import express from "express";
import readContent from "../../utils/helper.js";

const router = express.Router();

router.get("/fetch",async(req,res)=>{
    try {
        let userData = await readContent();
        console.log(userData);
        res.status(200).json({msg : userData })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})
export default router;
