const mongoose=require('mongoose');
const LectureSchema=new mongoose.Schema({
    lectId:{
        type:String,
        require:true,
    },
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
    phoneNum:{
        type:String,
        require:true,
    },        
    gender:{
        type:String,
        require:true,
    },
    // DoB:{
    //     type:String,
    //     require:true,
    // },
    bloodGroup:{
        type:String,
        require:true,
    },
    religion:{
        type:String,
        require:false,
    },
    picture:{
        type:String,
        require:false,
        default:'',
    },
    role:{
        type:String,
        default:'lecture',
    },

})

{timestamp:true}

module.exports=mongoose.model("Lecture",LectureSchema)