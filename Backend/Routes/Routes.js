 const express = require("express")
const { addRecipes, getRecipes, findRecipe, editRecipe } = require("../Controller/Recipes")
 const Router = express.Router()
 
Router.post("/recipe",addRecipes)
Router.get("/get",getRecipes)
Router.get("/:id",findRecipe)
Router.put("/recipe/:id",editRecipe)

module.exports = Router