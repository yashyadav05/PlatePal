const express = require("express")
const {  getRecipes, editRecipe, getRecipe, addRecipe, deleteRecipe,  } = require("../Controller/Recipes")
const verifyToken = require("../MIddleware/auth")
const { upload } = require("../MIddleware/multer")
const Router = express.Router()

Router.get("/",getRecipes) //Get all recipes
Router.get("/:id",getRecipe) //Get recipe by id
Router.post("/",upload.single('file'),verifyToken,addRecipe) //add recipe
Router.put("/:id",upload.single('file'),editRecipe) //Edit recipe
Router.delete("/:id",deleteRecipe)

module.exports = Router