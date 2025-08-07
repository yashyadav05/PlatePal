import { lazy, Suspense, useState } from 'react'
import Home from './Pages/Home'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Mainnavigation from './Components/Mainnavigation'
import axios from 'axios'
import AddFoodRecipe from './Pages/AddFoodRecipe'
import EditRecipe from './Pages/EditRecipe'
import RecipeDetails from './Pages/RecipeDetails'

const getRecipeItem = async() => {
  try {
    const response = await axios.get('https://platepal-sxnu.onrender.com/recipe')
    console.log("API response:", response.data)
    return response.data.getRecipe || []
  } catch (error) {
    console.error("Error fetching recipes:", error)
    throw new Error("Failed to fetch recipes")
  }
}
const getMyRecipes = async() => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      throw new Error("User not found in localStorage")
    }
    
    const allRecipes = await getRecipeItem()
    return allRecipes.filter(item => item.createdBy === user._id)
  } catch (error) {
    console.error("Error fetching user recipes:", error)
    throw new Error("Failed to fetch your recipes")
  }
}

const getFavRecipes = () => {
  try {
    return JSON.parse(localStorage.getItem("fav")) || []
  } catch (error) {
    console.error("Error fetching favorite recipes:", error)
    return []
  }
}

const getRecipes = async({params}) => {
  try {
    // Fetch recipe details
    const recipeResponse = await axios.get(`https://platepal-sxnu.onrender.com/recipe/${params.id}`)
    let recipe = recipeResponse.data.findRecipes // Extract actual recipe data
    
    if (!recipe) {
      throw new Error("Recipe not found")
    }
    
    // Fetch user details
    const userResponse = await axios.get(`https://platepal-sxnu.onrender.com/user/${recipe.createdBy}`)
    
    // Combine recipe with user email
    recipe = {
      ...recipe,
      email: userResponse.data.email
    }
    
    return recipe // Don't forget to return!
  } catch (error) {
    console.error("Error fetching recipe details:", error)
    throw new Error("Failed to fetch recipe details")
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainnavigation/>,
    children: [
      {path: "/", element: <Home/>, loader: getRecipeItem},
      {path: "/myRecipe", element: <Home/>, loader: getMyRecipes},
      {path: "/favRecipe", element: <Home/>, loader: getFavRecipes},
      {path: "/addRecipe", element: <AddFoodRecipe/>},
      {path: "/editRecipe/:id", element: <EditRecipe/>},
      {path: "/recipe/:id", element: <RecipeDetails/>, loader: getRecipes}
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
