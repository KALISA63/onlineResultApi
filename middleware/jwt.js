const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();

exports.sign=(payload)=>jwt.sign(payload,process.env.JWT_SECRET);
exports.verify=(payload)=>jwt.verify(payload,process.env.JWT_SECRET);