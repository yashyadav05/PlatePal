import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function AddFoodRecipe() {
    const [recipeData,setRecipeData] = useState({})
    let navigate = useNavigate()

    const onHandleSubmit = async(e)=>{
        e.preventDefault()
        console.log(recipeData)
        await axios.post("http://localhost:4000/api/v1/recipe",recipeData,{
          headers:{
                 "Content-Type" : 'multipart/form-data',
                 "authorization": "bearer " + localStorage.getItem("token")
          }
        })
        .then(()=>navigate("/"))
    }
    const onHandleChange =(e)=>{
      // console.log(e.target.files[0])
       let val =(e.target.name === "ingredients") ? e.target.value.split(",") :(e.target.name === "file") ? e.target.files[0] :e.target.value
       setRecipeData(pre => ({...pre, [e.target.name]:val}))
    }
  return (
    <>
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
  <form onSubmit={onHandleSubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input
        type="text"
        name="title"
        onChange={onHandleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
      <input
        type="text"
        name="time"
        onChange={onHandleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
      <textarea
        name="ingredients"
        rows="5"
        onChange={onHandleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
      <textarea
        name="instructions"
        rows="5"
        onChange={onHandleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Image</label>
      <input
        type="file"
        name="file"
        onChange={onHandleChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-gray-100 file:text-sm file:font-medium hover:file:bg-gray-200"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      Add Recipe
    </button>
  </form>
</div>

    </>
  )
}
