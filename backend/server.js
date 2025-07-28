const express= require('express');
const app=express();

const cors= require("cors");
const connectDB=require('./dbConnection');
const Ticket = require('./schema')

app.use(cors())

app.use(express.json())

connectDB()

app.use("/api",require("./routes")) //api created

app.listen(8080,()=>{
    console.log("App is listening");
    
})