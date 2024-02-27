//importing
const express = require("express");
const morgan = require("morgan");
require('dotenv').config();



const routerFile = require('./Routes/BasicROute');


//initialization
const app = new express();

//middlewear
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended:true }));
//accessing the port
const PORT = process.env.PORT || 3004;

//db connection

//api



app.use('/',routerFile);

//Any error call
app.get('*',(req,res)=>{
    res.status(404).send("<h1>404</h1>");
})

//Listening the port
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on ${PORT}`);
});