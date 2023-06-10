const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router();
const UserModel = require('../Models/Users.js')


router.post('/register',async (req,res)=>{
    // object destructuring.
    const { username , password } = req.body;  // or can do req.body.username and req.body.pass
    
    // Checking if the user already exist in the database.
    const user = await UserModel.findOne({username : username});
    if(user){
        return res.json({"message":"User already exist !"})
    }
    // this below line executes if user doesnt exist.
    // now to hashing the password for Security purpose..

    const hashedPassword = await bcrypt.hash(password , 10);

    // now add the user to the database.

    const newUser = new UserModel({
        username : username,
        password : hashedPassword
    })
    // saving the document.
    await newUser.save();
    res.json({"message" : "User Registered Successfully !"});
    
})
// login functionality.
router.post('/login',async (req,res)=>{
    const {username , password} = req.body;

    const user = await UserModel.findOne({username : username}); // this will get only that ONE user from database with the defined query.

    if(!user){ //if not user , means u are trying to login with the account that doesnt exist.
        res.json({"message":"Account doesn't exist !"});
    }

    // means user exist:
    const isPasswordValid = await bcrypt.compare(password , user.password) //compare with the password that is stored in the Database.

    if(!isPasswordValid){
        res.json({"message":"username or password is incorrect !"})
    }

    // means correct :

    const token = await jwt.sign({id: user._id},"secret"); //jwt token auth
    res.json({token , userID : user._id})
})








module.exports = router;