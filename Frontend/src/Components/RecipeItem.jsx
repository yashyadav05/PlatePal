import React from 'react'
import { useLoaderData } from 'react-router-dom'
import img from '../../public/chad-montano-eeqbbemH9-c-unsplash.jpg'
import { FaStopwatch } from "react-icons/fa6";

export default function RecipeItem() {
  const allRecipeItems = useLoaderData()
  console.log(allRecipeItems)
  
  return (
    <>
      <div className="bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest Recipes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {
            Array.isArray(allRecipeItems.getRecipe) && allRecipeItems?.getRecipe?.map((item, index) => {
              return (
                <div key={item._id || index} className="bg-white rounded-lg shadow-md p-4 flex items-start gap-4 hover:shadow-lg transition-shadow">
                  <img
                    src={img}
                    alt="img"
                    className="h-24 w-28 object-cover rounded"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-semibold text-gray-800">{item.title}</div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaStopwatch className="mr-2 text-blue-500" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
