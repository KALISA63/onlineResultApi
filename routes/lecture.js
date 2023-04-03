const express = require("express");
const Admin=require("../modules/Admin.js")
const Lecture=require("../modules/Lect.js")
const Student=require("../modules/Stud.js")
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const { verifyTokenAndLect } = require("../middleware/auth.js");
// const cloudinary=require('../cap/cloudinary.js')
// const JWT=require ('jsonwebtoken')


  
  //Login
  
  // router.post("/login",async(req,res)=>
  //   {
  //       try{
  //           const lecture=await Lecture.findOne({email:req.body.email});
  //           !lecture&&res.status(400).json("lecture doesn't exist!");
  //           const validated=await bcrypt.compare(req.body.password, lecture.password)
  //           !validated&&res.status(400).json("wrong Credential!");
  //           const {password, ...others}=lecture._doc;
  //           return res.status(200).json(others)
  //       }catch(err){
  //           console.log(err);
  //           return res.status(500).json(err);
  //       }
  //   });

  
  // Lecture edit

  router.patch("/updateById/:id",verifyTokenAndLect, async (req, res) => {
    try {
        // console.log("testing");
      if (req.body.lectId !== req.params.id) {
        return res.status(400).json("you can't update this a/c");
      }
      const lecture = await Lecture.findById(req.params.id);
      const comparePsw = await bcrypt.compare(req.body.password, lecture.password);
      if (!comparePsw) {
        return res.status(400).json("wrong password");
      }
      const UpdadedLecture = await Lecture.findByIdAndUpdate(
        req.params.id,
        {
          firstName: req.body.firstName,
          secondName: req.body.secondName,
          lectId:req.body.lectId,
          gender: req.body.gender,
          DoB: req.body.DoB,
          bloodGroup:req.body.bloodGroup,
          religion:req.body.religion,
          phoneNum:req.body.phoneNum,
          email: req.body.email,
          // password: hashedPass,
            },
        { new: true }
      );
      return res.status(200).json(UpdadedLecture);
    } catch (err) {
      console.log(err, "xfgchvjbknlm");
      return res.send(500).json(err);
    }
  });
  
  
  
  //GET
  
  router.get("/findById/:id",verifyTokenAndLect, async (req, res) => {
    try {
      const lecture = await Lecture.findById(req.params.id);
      if (!lecture) {
        return res.status(400).json("Sorry!, Account does not exist.");
      }
      const { password, ...others } = lecture._doc;
      return res.status(200).json(others);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  
  
  //Delete
  
  router.delete("/eraseById/:id", async (req, res) => {
    try {
      const lecture = await Lecture.findById(req.params.id);
      if (!lecture) {
        return res.status(401).json("Lecture a/c does not exist!");
      }
      if (req.body.lectId === req.params.id) {
        try {
          await Post.deleteMany({ lecturename: lecture.lecturename });
          await Lecture.findByIdAndDelete(req.params.id);
          return res.status(200).json("lecture disappeared!");
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      } else {
        return res.status(401).json("you are not allowed to delete this a/c");
      }
    } catch (err) {
      return res.status(404).json("Account not found");
    }
  });
  
  
  //GET All
  
  router.get("/getAll", async (req, res) => {
    try {
      const lecture = await Lecture.find();
      return res.status(200).json({lecture});
    } catch (err) {
      return res.status(500).json("you are not Admin");
    }
  });
  
  
  module.exports = router;
  