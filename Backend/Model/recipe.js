const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
   title:{
        type:String,
        required:true
   },
   ingredients:{
         type: [String],
        required:true
   },
   instructions:{
        type: [String],
        required:true
   },
   image:{
        type:String,
   },
   time:{
        type:String,
        required:true
   },
   createdBy:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
   },
},{timestamps:true})

module.exports = mongoose.model("recipeSchema",recipeSchema)