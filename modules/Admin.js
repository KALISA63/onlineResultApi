const mongoose=require('mongoose');
const AdminSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    
    },
    lastName:{
        type:String,
        require:true,
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
    email:{
        type:String,
        require:true,
    },
    phoneNum:{
        type:String,
        require:true,
    },        
    password:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
        require:false,
        default:'',
    },
    role:{
        type:String,
        default:'admin',
    },

    
},{timestamp:true})


module.exports=mongoose.model("Admin",AdminSchema)