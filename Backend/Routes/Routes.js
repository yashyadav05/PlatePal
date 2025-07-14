 const express = require("express")
const { addRecipes, getRecipes, findRecipe, editRecipe, uploads,  } = require("../Controller/Recipes")
const verifyToken = require("../MIddleware/auth")
 const Router = express.Router()
 
Router.post("/recipe",uploads.single('file'),verifyToken,addRecipes)
Router.get("/get",getRecipes)
Router.get("/:id",findRecipe)
Router.put("/recipe/:id",editRecipe)

module.exports = Router