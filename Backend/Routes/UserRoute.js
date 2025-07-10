 const express = require("express")
const { signUp, login, getUser } = require("../Controller/userController")
 const Router = express.Router()

 Router.post("/signup",signUp)
  Router.post("/login",login)
  Router.get("/user/:id",getUser)

 module.exports = Router