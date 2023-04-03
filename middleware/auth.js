const verify =require('./jwt');

const verifyToken=async(req,res,next)=>{
    try {
        const authHeader =req.headers.authorization || req.headers.token;
        if(!authHeader){
            return res.status(401).json({message:"You are not authenticated 1"});
        }
        const token=authHeader.split(' ')[1];
        if(!token){
           return res.status(401).json({message:"You are not authenticated 2"});
        }
        const verified=verify.verify(token);
        req.user=verified;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
const verifyTokenAndLect = (req,res,next) =>{
    verifyToken(req,res,() =>{
        if(req.user.role === 'lecture'){
            next();
        }
        else{
        res.status(400).json({message:"You are not a lecture"});
        }
    })
}
const verifyTokenAndRole = (req,res,next) =>{
    verifyTokenAndLect(req,res,() =>{
        if(req.user.role === 'admin'){
            next();
        }
        else{
        res.status(400).json({message:"You are not an admin"});
        }
    })
}
module.exports={verifyToken,verifyTokenAndRole,verifyTokenAndLect}