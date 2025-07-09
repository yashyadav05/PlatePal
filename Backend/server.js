//env Configration
require("dotenv").config()

// 2. Basic Express setup
const express = require("express")
const app = express()
const PORT = process.env.PORT || 4001
const Routes = require("./Routes/Routes")

const Maindb = require("./Config/db")
Maindb()

// 4. Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Main route
app.get("/",(req,res)=>{
    res.send("Hello World")
})

//connect to route
app.use("/api/v1",Routes)

app.listen(PORT,()=>console.log(`Server is connected to http://localhost:${PORT}`))