const RecipeModel = require('../Models/Recipes.js');
const mongoose = require('mongoose');
const express = require('express');
const UserModel = require('../Models/Users.js');

const router = express.Router();

// Display or GET the recipes.
router.get("/",async(req,res)=>{
    try {
        const recipesResponse = await RecipeModel.find({});
        res.json(recipesResponse);
    } catch (error) {
        res.json(error)
    }
        
})
router.post("/",async(req,res)=>{
    const recipesResponse = new RecipeModel(req.body);
    try {
        const response = await recipesResponse.save();
        res.json(response);
    } catch (error) {
        res.json(error)
    }
        
})
router.put("/save",async(req,res)=>{

    
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        
        user.savedRecipes.push(recipe);
        await user.save();

        res.json({savedRecipes : user.savedRecipes });
    } catch (error) {
        res.json(error)
    }
        
})
router.get("/savedRecipes/ids",async(req,res)=>{

    
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({savedRecipes : user?.savedRecipes})
    } catch (error) {
        res.json(error)
    }
        
})
router.get("/savedRecipes",async(req,res)=>{

    
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({
            _id: {$in : user.savedRecipes}
        })
        res.json({savedRecipes : savedRecipes})
    } catch (error) {
        res.json(error)
    }
        
})

module.exports = router;