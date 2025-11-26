import express from "express";
import {v4 as uuid} from "uuid";
import { addContent,dataContent } from "../../utils/helper.js";
import e from "express";


const router = express.Router();

router.post("/add",async (req,res)=>{
    try {
        let existingContent = await dataContent();
        let fullName = req.body.fullName;
        let age = req.body.age;
        let phoneNumber = req.body.phoneNumber;

        let user = {
            id : uuid(),
            fullName,
            age : Number(age),
            phoneNumber : Number(phoneNumber)
        }
        if(!user){
            return res.status(404).json({msg : "user not found"})
        }
        existingContent.push(user);

        await addContent(existingContent);
        res.status(200).json({user, msg : "user added "})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

router.put("/update/:id",async (req,res)=>{
    try {
        let existingContent = await dataContent();
        let Uid = req.params.id;
        let user = existingContent.find(u=>u.id === Uid);
        if(!user){
            return res.status(404).json({msg : "user not found"})
        }
        Object.assign(user,req.body)
        await addContent(existingContent);
        res.status(200).json({user , msg : "user details updated"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

router.delete("/delete/:id",async (req,res)=>{
    try {
        let existingContent = await dataContent();
        let Uid = req.params.id;
        let user = existingContent.filter(u=>u.id != Uid);

        if(!user){
            return res.status(404).json({msg : "user not found"})
        }

        await addContent(user);
        res.status(200).json({ user , msg : "user deleted sucessfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : error})
    }
})

router.get("/fetch/:id",async (req,res)=>{
    try {
        let existingContent = await dataContent();
        let Uid = req.params.id;
        let user = existingContent.find(u=>u.id === Uid);
        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

router.get("/getall",async (req,res)=>{
    try {
        let existingContent = await dataContent();
        console.log(typeof existingContent);
        res.status(200).json({existingContent})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : error})
    }
})

router.delete("/deleteall",async(req,res)=>{
    try {
        let existingContent = await dataContent();
        let flush = existingContent.filter(u=>u);
        await addContent(existingContent);
        res.status(200).json({flush , msg : "deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})
export default router