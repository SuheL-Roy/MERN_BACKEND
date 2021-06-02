
const Catagoryrouter = require("express").Router();
const Catagory = require("../Models/Catagory.js");


Catagoryrouter.post("/", async(req, res) => {
    const newCat = new Catagory(req.body);
    try{
        const saveCat = await newCat.save();
        res.status(200).json(saveCat);

    }catch(err){
        res.status(500).json(err);
    }

})

Catagoryrouter.get("/", async(req,res) => {
    try{
        const Cats = await Catagory.find();
        res.status(200).json(Cats);

    }catch(err){
        res.status(500).json(err);
    }
})







module.exports = Catagoryrouter;