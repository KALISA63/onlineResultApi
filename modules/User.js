const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },        
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        require:true,
    },
    DoB:{
        type:String,
        require:true,
    },
    bloodGroup:{
        type:String,
        require:true,
    },
    religion:{
        type:String,
        require:false,
    },
    section:{
        type:String,
        require:true,
    },
    course:{
        type:String,
        require:true,
    },

    
},{timestamp:true})


module.exports=mongoose.model("User",UserSchema)