import express from "express";
import {v4 as uuid } from "uuid";
import { addContent,dataContent } from "../../utils/helper.js";

const router = express.Router();

router.post("/add",async (req,res)=>{
    try {
        let existingData = await dataContent();

        let fullName = req.body.fullName;
        let age = req.body.age;
        let phoneNumber = req.body.phoneNumber;

        let user = {
            id : uuid(),
            fullName : fullName,
            age : Number(age),
            phoneNumber : Number(phoneNumber)
        };

        if(!fullName || !age  || !phoneNumber){
            return res.status(404).json({msg : "keys are invalid"})
        }

        existingData.push(user);
        await addContent(existingData);
        res.status(201).json({user , msg : "user added sucessfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : error})
    }
})

router.put("/update/:id",async (req,res)=>{
    try {
        let existingData = await dataContent();

        let Uid = req.params.id;

        let user = existingData.find(u=>u.id === Uid);

        if(!user){
            return res.status(404).json({ msg : "user not found"})
        }

        Object.assign(user,req.body);

        await addContent(existingData);

        res.status(200).json({msg : "given details updated sucessfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

router.delete("/delete/:id",async (req,res)=>{
    try {
        let existingData = await dataContent();

        let Uid = req.params.id;

        let user = existingData.filter(u=>u.id != Uid);
        if(!user){
            return res.status(404).json({ msg : "invalid token"})
        }
        await addContent(user);

        res.status(200).json({existingData, msg : "this user deleted sucessfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : error})
    }
})

router.get("/fetch",async (req,res)=>{
    try {
        let existingData = await dataContent();
        res.status(200).json({existingData})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : error})
    }
})

router.get("/getuser/:id",async (req,res)=>{
    try {
        let existingData = await dataContent();

        let Uid = req.params.id 

        let user = existingData.find(u=>u.id === Uid);

        if(!user){
            return res.status(404).json({msg : "user not found!"})
        }

        res.status(200).json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

export default router;