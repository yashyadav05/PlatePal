 const express = require("express")
const { addRecipes, getRecipes, findRecipe } = require("../Controller/Recipes")
 const Router = express.Router()
 
Router.post("/recipe",addRecipes)
Router.get("/get",getRecipes)
Router.get("/:id",findRecipe)

module.exports = Router