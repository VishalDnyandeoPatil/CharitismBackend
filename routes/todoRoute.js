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

 todoRoute.post('/add',Auther(["Super Admin","Admin"]),async(req,res)=>{
    try {
        const data = req.body;
        const newTodo =  new todo (data);
        await newTodo.save();
        res.send({msg:"Todo created"})
    } 
    catch (error) {
        res.send(error.message)    
    }
 });

 todoRoute.patch('/update/:id',Auther(["Super Admin"]), async(req,res)=>{
    try {
        const data = req.body;
        const id = req.params.id;
        const update = await todo.findByIdAndUpdate(id,data);
        res.send({msg:"Todo Updated"})
    } 
    catch (error) {
        res.send({msg:error.message})
    }
 })

 todoRoute.delete("/delete/:id",Auther(["Super Admin","Admin"]), async(req,res)=>{
    try {
        const id = req.params.id;
        const deleteTodo = await todo.findByIdAndDelete(id);
        if(deleteTodo){
            res.send({msg:"Todo deleted"})
        }
        else{
            res.send({msg:"Not found Todo"})
        }    
    } 
    catch (error) {
        res.send({msg:error.message})
    }
 });