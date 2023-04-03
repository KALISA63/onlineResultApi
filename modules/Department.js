const mongoose = require("mongoose")
const DepartmentSchema = new mongoose.Schema({

    departId:{
        type:String,
        required:true,
    },

    departmentName:{
        type:String,
        required:true,
    },
    headofDepartment:{
        type:String,
        required:true,
    },
    startDate:{
        type:String,
        required:true,
    },
    nofStudent:{
        type:Number,
        required:true,
    },

},
{ timestamps: true}
);

module.exports = mongoose.model("Department", DepartmentSchema);