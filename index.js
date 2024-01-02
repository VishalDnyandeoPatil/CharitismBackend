const express = require('express');
const {connection}= require('./config/db');
const{userRoute} = require('./routes/user_route');
const {auth}= require('./middelware/authentication')
const {todoRoute} = require('./routes/todoRoute');

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("WELCOME TO TODO APP")
})

app.use('/users',userRoute);
app.use('/todos', auth,todoRoute);

app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Todo app connected to DB");
    } 
    catch (error) {
        console.log(error.message);    
    }
})
