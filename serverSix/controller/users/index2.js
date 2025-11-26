import express from "express";
import {v4 as uuid } from "uuid";
import { addContent,dataContent } from "../../utils/helper.js";

const router = express.Router();

router.post("/add",async (req,res)=>{
    try {
        let existingData = await dataContent();
        let fullName = req.body.fullName;
        let age = req.body.age;
        let school = req.body.school;

        let user = {
            id :uuid(),
            fullName,
            age : Number(age),
            school
        }

        if(!fullName  || !age || !school){
            return res.status(404).json({msg : "invalid keys"})
        }

        if(age < 18){
            return res.status(403).json({msg : "your age is not eligible"})
        }

        existingData.push(user);
        await addContent(existingData);

        res.status(200).json({user,msg : "user added sucessfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})
export default router