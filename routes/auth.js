const router=require('express').Router();
const User=require('../modules/User');
const bcrypt=require('bcrypt');
const sign=require('../middleware/jwt')

router.post('/register',async(req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        const user=new User(req.body)
        const userExist=await User.findOne({email:req.body.email});
        //const accessToken=sign.sign({_id:user.id,role:user.role})
        if(userExist){
            return res.status(404).json({message:"Email exists, just try an other different email!!"})
        }
        user.password=hashedPassword;
        await user.save();
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:"Internal Server error", data:error})
    }
})
router.post('/login',async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json({message:"Invalid User"})
        const validated=await bcrypt.compare(req.body.password,user.password);
        if(!validated)  return res.status(400).json({message:"Invalid Password"})
        const accessToken=sign.sign({_id:user.id,role:user.role})
        return res.status(200).json({message:"Successfully Logged In", data:user,token:accessToken})
    } catch (error) {
       return res.status(500).json({message:"Internal Server error", data:error})
    }
})
module.exports=router;