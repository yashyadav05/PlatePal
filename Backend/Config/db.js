require("dotenv").config()
const mongoose = require("mongoose")

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is connected")
    } catch (error) {
        console.error("Database connection failed");
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = dbConnection