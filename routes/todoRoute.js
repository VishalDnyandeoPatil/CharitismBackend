const express = require('express');
const {todo}= require('../model/todoModel');
const{Auther}= require('../middelware/authorization');
const todoRoute= express.Router();

todoRoute.get("/",Auther(["User","Super Admin","Admin"]),async(req,res)=>{

    try {
        const {userId}= req.body;
        const Todo = await todo.find({$and:[{userId}]});
        res.json({msg:"Your post",Todo});    
    } 
    catch (error) {
        res.send(error.message);
    }


});

todoRoute.get('/:id',Auther(["Super Admin","Admin"]),async(req,res)=>{
    try {
        const id = req.params.id;
        const Todo = await todo.findById(id);
        res.send({Todo})    
    } 
    catch (error) {
        res.send({msg:error.message})
    }
 })