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

exports.editRecipe = async(req,res)=>{
    const {title,ingredients,instructions,time} = req.body
    let recipefind = await recipe.findById(req.params.id)
    try {
        if(recipefind){
    const editRecipe = await recipe.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json({
        success:true,
        message:"Recipe updated successfully"
    })
    }
    } catch (error) {
        console.log("Something went wrong")
        console.log(error)
    }
    
}