const jwt = require('jsonwebtoken');
require("dotenv").config();
const {users}= require('../model/user_model');

const{blacklist}= require('../blackList/blacklist')

const auth = async(req,rtes,next)=>{
    try {
        let token=req?.headers?.authorization;
        if(!token){
            return res.status(401).json({message:"Not authorized user"})
        }
        token=req.headers.authorization.split(" ")[1];
        
        if(blacklist.includes(token)){
            return res.status(401).json({message:"Not authorized user"})
        }

        const decodedToken =  jwt.verify(token,process.env.secretKey);
        
        if(!decodedToken){
            return res.status(401).json({message:"Not authorized user"})
        }
        const {userId}=decodedToken;
        const user=await users.findOne({_id:userId});
        
        const role=user?.role;
        req.role=role
        next()
    } 
    catch (error) {
        return res.status(500).json({message:"Please try again",error:error.message});
    }
}

module.exports={auth};