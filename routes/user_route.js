const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');

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