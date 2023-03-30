const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose")
const multer = require("multer");
const adminRoute=require("./onlineResultMgtApi/routes/admin.js")
const lectureRoute=require("./onlineResultMgtApi/routes/lecture.js");
const studentRoute=require("./onlineResultMgtApi/routes/student.js");
const bodyParser = require('body-parser');
const DepartmentRoute = require("./routes/department.js")
const subjectRoute=require("./routes/subject.js")
// const subjectRoute=require("./routes/subject");
// const swaggerUi=require('swagger-ui-express');
// const swaggerJSDoc= require("swagger-jsdoc");
// const swagDocs=require('./SwagDocs/swagFile');


dotenv.config();
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(console.log("Server Connected"))
.catch((err)=>console.log(err));

console.log("Online Result Mgt Sysytem");

app.use(bodyParser.json())
app.listen("7000", ()=>{
    console.log("my server is running...");
});

app.get("/", (req, res) => {
    res.send("KALISA Jacques");
});

app.use("/admin", adminRoute);
app.use("/lecture",lectureRoute);
app.use("/student", studentRoute);
// swagDocs(app);

app.use("/department", DepartmentRoute);
app.use("/subject",subjectRoute);
