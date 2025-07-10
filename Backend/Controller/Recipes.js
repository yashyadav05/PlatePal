const recipe = require("../Model/recipe")

exports.addRecipes = async(req,res)=>{
    //Fetching details
     const {title,ingredients,instructions,time} = req.body
     //checking form details
     if(!title||!ingredients||!instructions||!time){
        return res.status(400).json({
            success:false,
            message:"Please fill the form"
        })
     }

     const create = await recipe.create({
        title,ingredients,instructions,time
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