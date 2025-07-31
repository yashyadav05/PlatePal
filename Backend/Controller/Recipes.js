const multer  = require('multer')
const Recipes = require("../Model/recipe")
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //if issue change this to this 
    // cb(null,  "../Public/Images")
    cb(null, path.join(__dirname, "../Public/Images"))
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage })
exports.uploads = upload;
// console.log(upload)

exports.addRecipe = async(req,res)=>{
     const {title,ingredients,instructions,time} = req.body
     if(!title||!ingredients||!instructions){
        return res.status(400).json({
            success:false,
            message:"Please fill the form"
        })
     }

     const create = await Recipes.create({
        title, 
        ingredients,     // already an array
        instructions, 
        time,
        coverImage: req.file?.filename || "" ,
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