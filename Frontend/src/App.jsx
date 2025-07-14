import { useState } from 'react'
import Home from './Pages/Home'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Mainnavigation from './Components/Mainnavigation'
import axios from 'axios'
import AddFoodRecipe from './Pages/AddFoodRecipe'
import EditRecipe from './Pages/EditRecipe'

const getRecipeItem = async()=>{
     let allRecipes = []
     await axios.get('http://localhost:4000/api/v1/get').then(res=>{
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


const router = createBrowserRouter([
  {path:"/",element:<Mainnavigation/>,children:[
     {path:"/",element:<Home/>, loader:getRecipeItem},
     {path:"/myRecipe",element:<Home/>, loader:getMyRecipes},
     {path:"/favRecipe",element:<Home/>},
     {path:"/addRecipe",element:<AddFoodRecipe/>},
     {path:"/editRecipe/:id",element:<EditRecipe/>},
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
