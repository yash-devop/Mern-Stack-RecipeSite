const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    savedRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "recipes",   // makes reference of the objectid with the recipes table/collction.
    }]
});

// Creating the Model collection from the Schema that we created.

// const modelName = mongooose.model(collectionBased , SchemaName)
const UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel;