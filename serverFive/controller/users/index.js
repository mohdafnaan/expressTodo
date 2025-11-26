import express, { response } from "express";
import { v4 as uuid } from "uuid";
import { dataContent, addContent } from "../../utils/helper.js";

const router = express.Router();

// post ==> used to add data to db;

router.post("/adduser", async (req, res) => {
  try {
    const existingData = await dataContent();
    let fName = req.body.fName;
    let age = req.body.age;
    let phoneNumber = req.body.phoneNumber;

    if (!fName || !age || !phoneNumber) {
      return res.status(404).json({ msg: "invalid keys " });
    }

    let newData = {
      id: uuid(),
      fName,
      age: Number(age),
      phoneNumber: Number(phoneNumber),
    };
    existingData.push(newData);

    await addContent(existingData);

    res.status(201).json({ newData, msg: "user created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});
export default router;


// put => update existing data 

router.put("/update/:id",async (req,res)=>{
    try {
        let existingData = await dataContent();
        const Uid = req.params.id;
        let user = existingData.find(u => u.id === Uid);
        if(!user){
            return res.status(404).json({msg : "user not found "})
        }
         Object.assign(user,req.body);
        await addContent(existingData);
        res.status(200).json({ msg : "updated sucessfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

//delete => deletes the existing user 

router.delete("/delete/:id",async (req,res)=>{
    try {
        let existingData = await dataContent();

        let Uid = req.params.id;
        
        let user = existingData.filter(u => u.id != Uid);

        if(!user){
            return res.status(404).json({msg : "user not found"})
        }

        await addContent(user);

        res.status(200).json({ msg : "account deleted"})

    
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})


// get ==> fetech all data

router.get("/fetch",async (req,res)=>{
    try {
        let existingData = await dataContent();
        res.status(200).json(existingData)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

// get ==> fetch data by id 

router.get("/getuser/:id",async (req,res)=>{
    try {
        let existingData = await dataContent();
        let Uid = req.params.id;
        let user = existingData.find(u => u.id === Uid);
        res.status(200).json({ msg : user})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})