import { useState } from 'react'
import Home from './Pages/Home'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Mainnavigation from './Components/Mainnavigation'
import axios from 'axios'

const getRecipeItem = async()=>{
     let allRecipes = []
     await axios.get('http://localhost:4000/api/v1/get').then(res=>{
      allRecipes = res.data
     })
     return allRecipes
}


const router = createBrowserRouter([
  {path:"/",element:<Mainnavigation/>,children:[
     {path:"/",element:<Home/>, loader:getRecipeItem}
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
