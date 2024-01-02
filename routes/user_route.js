const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
require('dotenv').config();
const {users} = require("../model/user_model");
const {auth} = require("../middelware/authentication")

const{blacklist}= require('../blackList/blacklist');

const userRoute = express.Router();

userRoute.post("/signup", async(req,res)=>{
    try {
        const payload = req.body;
        const User = await users.findOne({email:payload.email});
        if(User){
            return res.send({msg:"User already exist, please login"});
        }
        else{
            const hashPass= await bcrypt.hashSync(payload.password,5);
            payload.password=hashPass;
          
            const newUser= new users(payload);
            await newUser.save();
            return res.json({msg:"User register", user:newUser});
        }
    } 
    catch (error) {
        res.send({msg:error.message});
    }
});

userRoute.post("/login", async(req,res)=>{
    try {
       const payload = req.body;
       const User =  await users.findOne({email:payload.email});
       if(!User){
        return res.send("Please signup")
       }
       const correctPass = await bcrypt.compareSync( payload.password,User.password);
       if(correctPass){
        const token = await jwt.sign({ email:User.email,userId:User._id}, process.env.secretKey, { expiresIn: '2m' });
        
        const refreshtoken = await jwt.sign({ email:User.email,userId:User._id}, process.env.refreshsecretKey, { expiresIn: '3m' });
        res.json({msg:"Login Sucessful",token, refreshtoken})
       }
       else{
        res.send({msg:"Invalid credentials"})
       }
    } 
    catch (error) {
        console.log("Error at user route");
        res.send(error.message);
    }
});

userRoute.get("/logout", auth,(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    blacklist.push(token);
    
    res.send("Logout Success");
})

userRoute.get("/refreshtoken", (req,res)=>{
    const refreshtoken = req.headers.authorization?.split(" ")[1];
    
    const decoded= jwt.verify(refreshtoken,process.env.refreshsecretKey);

    if(decoded){
        const token =  jwt.sign({ email:decoded.email,userId:decoded._id}, process.env.secretKey, { expiresIn: '1d' });
        return res.send(token)
    }
    else{
        res.send("TIME's OVER, Login Again.. ")
    }
    res.send("new token");
})

module.exports={userRoute};