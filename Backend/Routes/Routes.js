 const express = require("express")
const {  getRecipes, editRecipe, uploads, getRecipe, addRecipe, deleteRecipe,  } = require("../Controller/Recipes")
const verifyToken = require("../MIddleware/auth")
 const Router = express.Router()
 
// Router.post("/recipe",uploads.single('file'),verifyToken,addRecipes)
// Router.get("/get",getRecipes)
// Router.get("/recipe/:id",findRecipe)
// Router.put("/recipe/:id",editRecipe)

Router.get("/",getRecipes) //Get all recipes
Router.get("/:id",getRecipe) //Get recipe by id
Router.post("/",uploads.single('file'),verifyToken,addRecipe) //add recipe
Router.put("/:id",uploads.single('file'),editRecipe) //Edit recipe
Router.delete("/:id",deleteRecipe)

module.exports = Router