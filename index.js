const express = require('express');
const {connection}= require('./config/db');


const app = express();
app.use(express.json());



app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Todo app connected to DB");
    } 
    catch (error) {
        console.log(error.message);    
    }
})
