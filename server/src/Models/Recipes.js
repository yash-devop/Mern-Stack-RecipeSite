const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String, //mongoose.Schema.Types.String
        required: true,
    },
    ingredients: [
        {
            type: String,
            required: true,
        },
    ],
    instructions: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",  //means this is creating a reference to users table/collection.
        required: true,
    },
});

const RecipeModel = mongoose.model("recipes",RecipeSchema);
module.exports = RecipeModel;