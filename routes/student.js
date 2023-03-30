const express = require("express");
const Admin=require("../modules/Admin.js")
const Lecture=require("../modules/Lect.js")
const Student=require("../modules/Stud.js")
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
// const cloudinary=require('../cap/cloudinary.js')
// const JWT=require ('jsonwebtoken')


  //Student Login

  router.post("/login",async(req,res)=>
    {
        try{
            const student=await Student.findOne({email:req.body.email});
            !student&&res.status(400).json("student doesn't exist!");
            const validated=await bcrypt.compare(req.body.password, student.password)
            !validated&&res.status(400).json("wrong Credential!");
            const {password, ...others}=student._doc;
            return res.status(200).json(others)
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    });
    
  
  //Student Edit
  
  router.patch("/updateById/:id", async (req, res) => {
    try {
        // console.log("testing");
      if (req.body.regNum !== req.params.id) {
        return res.status(400).json("you can't update this a/c");
      }
      const student = await Student.findById(req.params.id);
      const comparePsw = await bcrypt.compare(req.body.password, student.password);
      if (!comparePsw) {
        return res.status(400).json("wrong Password");
      }
      const UpdadedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        {
          firstName: req.body.firstName,
          secondName: req.body.secondName,
          gender: req.body.gender,
          DoB: req.body.DoB,
          regNum:req.body.regNum,
          class:req.body.class,
          section:req.body.section,
          admissionId:req.body.admissionId,
          bloodGroup:req.body.bloodGroup,
          religion:req.body.religion,
          phoneNum:req.body.phoneNum,
          email: req.body.email,
          // password: hashedPass,
            },
        { new: true }
      );
      return res.status(200).json(UpdadedStudent);
    } catch (err) {
      console.log(err, "xfgchvjbknlm");
      return res.send(500).json(err);
    }
  });
  
  
  
  //Get student
  
  router.get("/findById/:id", async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(400).json("Sorry!, Student does not exist.");
      }
      const { Password, ...others } = student._doc;
      return res.status(200).json(others);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  
  
  //Delete student
  
  router.delete("/eraseById/:id", async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(401).json("Student does not exist!");
      }
      if (req.body.studentId === req.params.id) {
        try {
          await Post.deleteMany({ studentname: student.studentname });
          await Student.findByIdAndDelete(req.params.id);
          return res.status(200).json("student deleted");
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      } else {
        return res.status(401).json("you are not allowed to delete this student");
      }
    } catch (err) {
      return res.status(404).json("student not found");
    }
  });
  
  
  //Get all students
  
  router.get("/getAll", async (req, res) => {
    try {
      const student = await Student.find();
      return res.status(200).json({student});
    } catch (err) {
      return res.status(500).json("you are not admin");
    }
  });


module.exports = router;