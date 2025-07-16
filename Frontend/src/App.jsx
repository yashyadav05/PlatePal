import { useState } from 'react'
import Home from './Pages/Home'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Mainnavigation from './Components/Mainnavigation'
import axios from 'axios'
import AddFoodRecipe from './Pages/AddFoodRecipe'
import EditRecipe from './Pages/EditRecipe'
import RecipeDetails from './Pages/RecipeDetails'

const getRecipeItem = async()=>{
     let allRecipes = []
     await axios.get('http://localhost:4000/recipe').then(res=>{
      allRecipes = res.data.getRecipe  || []  // fix here
      console.log("API response:", res.data)
      console.log("Recipes:", res.data.recipes)
     })
     console.log(allRecipes)
     return allRecipes
}

const getMyRecipes = async()=>{
  let user = JSON.parse(localStorage.getItem("user"))
  let allRecipess = await getRecipeItem()
   console.log(allRecipess)
  return allRecipess.filter(item => item.createdBy === user._id)
 
  // let allRecipess = Array.isArray(response)
  //   ? response
  //   : response.recipes || [];
  // return allRecipess.filter(item => item.createdBy === user._id)
}

const getFavRecipes =()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const getRecipes =async({params})=>{
 let recipe;
 await axios.get(`http://localhost:4000/recipe/${params.id}`)
 .then(res=>recipe=res.data)
 await axios.get(`http://localhost:5000/user/${recipe.createdBy}`)
 .then(res=>{
  recipe={...recipe,email:res.data.email}
 })
}

const router = createBrowserRouter([
  {path:"/",element:<Mainnavigation/>,children:[
     {path:"/",element:<Home/>, loader:getRecipeItem},
     {path:"/myRecipe",element:<Home/>, loader:getMyRecipes},
     {path:"/favRecipe",element:<Home/>,loader:getFavRecipes},
     {path:"/addRecipe",element:<AddFoodRecipe/>},
     {path:"/editRecipe/:id",element:<EditRecipe/>},
     {path:"/recipe/:id",element:<RecipeDetails/>,loader:getRecipes}
  ]}
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
