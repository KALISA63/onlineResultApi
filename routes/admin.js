const express = require("express");
const Admin=require("../modules/Admin.js")
const Lecture=require("../modules/Lect.js")
const Student=require("../modules/Stud.js")
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
// const cloudinary=require('../cap/cloudinary.js')
const JWT=require ('jsonwebtoken')



//Register

// router.post("/register", async (req, res) => {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPass = await bcrypt.hash(req.body.password, salt);
//       // console.log(hashedPass)
//       const newAdmin = new Admin({
//         firstName: req.body.firstName,
//         secondName: req.body.secondName,
//         gender: req.body.gender,
//         DoB: req.body.DoB,
//         bloodGroup:req.body.bloodGroup,
//         religion:req.body.religion,
//         phoneNum:req.body.phoneNum,
//         email: req.body.email,
//         password: hashedPass,
//       });
//       const adminEmail = await Admin.find({ email: req.body.email })

//       if(adminEmail.length!==0){
  
//         return res.status(402).json("Pls, register with difference Email!");
//       }
//       else{
//         const admin = await newAdmin.save();
//         return res.status(200).json(admin);
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//   });
  
  
  
  //Login


  // router.post("/login",async(req,res)=>
  //   {
  //       try{
  //           const admin=await Admin.findOne({email:req.body.email});
  //           !admin&&res.status(400).json("admin doesn't exist!");
  //           const validated=await bcrypt.compare(req.body.password, admin.password)
  //           !validated&&res.status(400).json("wrong Credential!");
  //           const {password, ...others}=admin._doc;
  //           return res.status(200).json(others)
  //       }catch(err){
  //           console.log(err);
  //           return res.status(500).json(err);
  //       }
  //   });
    
  
  //admin edit
  
  router.patch("/updateById/:id", async (req, res) => {
    try {
        console.log("testing");
      if (req.body.adminId !== req.params.id) {
        return res.status(400).json("you can't update this a/c");
      }
      const admin = await Admin.findById(req.params.id);
      const comparePsw = await bcrypt.compare(req.body.password, admin.password);
      if (!comparePsw) {
        return res.status(400).json("wrong Password");
      }
      //   const salt = await bcrypt.genSalt(10);
      // req.body.Password = await bcrypt.hash(req.body.Password, salt);
      //   try {
      const UpdadedAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        {
          firstName: req.body.firstName,
          secondName: req.body.secondName,
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
      return res.status(200).json(UpdadedAdmin);
    } catch (err) {
      console.log(err, "xfgchvjbknlm");
      return res.send(500).json(err);
    }
  });
  
  
  
  //GET
  
  router.get("/findById/:id", async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(400).json("Sorry!, Admin does not exist.");
      }
      const { Password, ...others } = admin._doc;
      return res.status(200).json(others);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  
  
  //Delete
  
  // router.delete("/eraseById/:id", async (req, res) => {
  //   try {
  //     const admin = await Admin.findById(req.params.id);
  //     if (!admin) {
  //       return res.status(401).json("Admin does not exist!");
  //     }
  //     if (req.body.adminId === req.params.id) {
  //       try {
  //         await Post.deleteMany({ adminEmail: admin.adminEmail });
  //         await Admin.findByIdAndDelete(req.params.id);
  //         return res.status(200).json("admin deleted");
  //       } catch (err) {
  //         console.log(err);
  //         return res.status(500).json(err);
  //       }
  //     } else {
  //       return res.status(401).json("you are not allowed to delete this admin");
  //     }
  //   } catch (err) {
  //     return res.status(404).json("Admin not found");
  //   }
  // });
  
  
  //GET All
  
  router.get("/getAll", async (req, res) => {
    try {
      const admin = await Admin.find();
      return res.status(200).json({admin});
    } catch (err) {
      return res.status(500).json("you are not Admin");
    }
  });
  


//lecture register

router.post("/regLec", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // console.log(hashedPass)
    const newLecture = new Lecture({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      lectId:req.body.lectId,
      gender: req.body.gender,
      DoB: req.body.DoB,
      bloodGroup:req.body.bloodGroup,
      religion:req.body.religion,
      phoneNum:req.body.phoneNum,
      email: req.body.email,
      password: hashedPass,
    });
    const LectureEmail = await Lecture.find({ email: req.body.email })

    if(LectureEmail.length!==0){

      return res.status(402).json("Pls, register with difference Email!");
    }
    else{
      const lecture = await newLecture.save();
      return res.status(200).json(lecture);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});



//student register


router.post("/regStud", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // console.log(hashedPass)
    const newStudent = new Student({
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
      password: hashedPass,
    });
    const StudentEmail = await Student.find({ email: req.body.email })

    if(StudentEmail.length!==0){

      return res.status(402).json("Pls, register with difference Email!");
    }
    else{
      const student = await newStudent.save();
      return res.status(200).json(student);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

  
  module.exports = router;
  