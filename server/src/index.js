require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userRouter = require('./routes/users.js')
const recipeRouter = require('./routes/recipes.js')
const path = require('path')
app.use(express.json());
app.use(cors());
app.use('/auth',userRouter)
app.use('/recipes',recipeRouter)
app.use(express.static(path.join(__dirname , '../../client/build')))
console.log(path.join(__dirname , '../../client/build'))


// database Connectivity

mongoose.connect("mongodb+srv://yash-devop:4BVUS22p29ViSgBE@cluster0.ebuoqlr.mongodb.net/recipes")
.then(()=>console.log("Database Connected"))
.catch((err)=>console.log(err))


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../client/build/index.html"))
})

// Listening to the Port and server start.
app.listen(3001,()=>{
    console.log("Server Started")
})

