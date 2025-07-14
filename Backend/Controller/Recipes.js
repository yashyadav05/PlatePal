const multer  = require('multer')
const recipe = require("../Model/recipe")
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

exports.addRecipes = async(req,res)=>{
    //Fetching details
    console.log(req.user)
     const {title,ingredients,instructions,time} = req.body
     //checking form details
     if(!title||!ingredients||!instructions){
        return res.status(400).json({
            success:false,
            message:"Please fill the form"
        })
     }

     const create = await recipe.create({
        title, 
        ingredients,     // already an array
        instructions, 
        time,
        image: req.file?.filename || "" ,
        createdBy:req.user.id
     })

     return res.status(200).json({
        success:true,
        message:"Recipe added successfully",
        create
     })
}

exports.getRecipes = async(req,res)=>{
    const getRecipe = await recipe.find()
    return res.status(200).json({
        success:true,
        message:"data fetched successfully",
        getRecipe
    })
}

exports.findRecipe = async(req,res)=>{
    const findRecipes = await recipe.findById(req.params.id)
    return res.status(200).json({
        success:true,
        message:"fetched successfully",
        findRecipes
    })
}

exports.editRecipe = async (req, res) => {
    try {
        const recipeFind = await recipe.findById(req.params.id);

        if (!recipeFind) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            });
        }

        const updatedRecipe = await recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Recipe updated successfully",
            recipe: updatedRecipe
        });

    } catch (error) {
        console.error("Error while updating recipe:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

exports.deleteRecipe = async(req,res)=>{
    
}