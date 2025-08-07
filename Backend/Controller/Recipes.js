const { imagekit } = require("../Config/imageKit")
const Recipes = require("../Model/recipe")
const fs = require('fs')

exports.addRecipe = async(req,res)=>{
     const {title,ingredients,instructions,time} = req.body
     const imageFile = req.file
     if(!title||!ingredients||!instructions||!imageFile){
        return res.status(400).json({
            success:false,
            message:"Please fill the form"
        })
     }
     //ImageKit file upload
     const fileBuffer = fs.readFileSync(imageFile.path)
     const response = await imagekit.upload({
        file:fileBuffer,
        fileName:imageFile.originalname,
        folder:'/recipe'
     })
     //optimization through imagekit url
     const optimizedUrl = imagekit.url({
        path:response.filePath,
        transformation:[
            {quality:'auto'}, //Auto compression
            {format:'webp'}, //convert to modern webApp
            {width:'1280'} //width resizing
        ]
     })
     const create = await Recipes.create({
        title, 
        ingredients,     // already an array
        instructions, 
        time,
        coverImage:optimizedUrl,
        createdBy:req.user.id
     })

     return res.status(200).json({
        success:true,
        message:"Recipe added successfully",
        create
     })
}

exports.getRecipes = async(req,res)=>{
    const getRecipe = await Recipes.find()
    return res.status(200).json({
        success:true,
        message:"data fetched successfully",
        getRecipe
    })
}

exports.getRecipe = async(req,res)=>{
    const findRecipes = await Recipes.findById(req.params.id)
    return res.status(200).json({
        success:true,
        message:"fetched successfully",
        findRecipes
    })
}

exports.editRecipe = async (req, res) => {
    const {title,ingredients,instructions,time} = req.body
    let recipe = await Recipes.findById(req.params.id)

    try {
        if(recipe){
            let coverImage = req.file?.filename ? req.file?.filename : recipe.coverImage
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
            res.json({title,ingredients,instructions,time})
        }
    } catch (err) {
         return res.status(404).json({message:err})
    }
};

exports.deleteRecipe = async(req,res)=>{
    try {
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    } catch (error) {
        return res.status(400).json({message:"error"})
    }
}