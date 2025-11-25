import express from "express";
import {v4 as uuid} from "uuid"
import {dataContent,addContent} from "../../utils/helper.js";

const router = express.Router();

router.get("/fetch",async(req,res)=>{
    try {
        let dataContent = await usersData();
        console.log(dataContent);
        res.status(200).json({msg : dataContent})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

router.post("/addusers",async(req,res)=>{
    try {
        let fullName = req.body.fullName;
        let age = req.body.age;
        let isAlive = req.body.isAlive;

        if(!fullName || !age || !isAlive){
            return res.status(400).json ({ msg : "fullName, age and isAlive is required"})
        }
        const users = await dataContent();

        const newUser = {
            id : uuid(),
            fullName : fullName,
            age : Number(age),
            isAlive : isAlive
        };

        users.push(newUser);
        await addContent(users)
        res.status(201).json({ msg : "user created"})

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : error})
    }
})

router.put("/updateuser/:id",async (req,res)=>{
    try {
        const allUser = await dataContent();
        const id = req.params.id;

        const user = allUser.find( u=>u.id===id);
        if(!user){
            return res.status(404).json({msg : "user not found"})
        }

        Object.assign(user,req.body);
        await addContent(allUser);
        res.status(200).json({msg : "updated sucessfully"})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

router.delete("/delete/:id",async (req,res)=>{
    try {
        let userId = req.params.id;
        let existingData = await dataContent();
        let newData = existingData.filter((x) => x.id != userId);
        await addContent(newData);

        res.status(200).json({msg : "sucessfully deleted"})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})
export default router;