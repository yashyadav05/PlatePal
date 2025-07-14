import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { FaStopwatch } from "react-icons/fa6"
import { FaRegEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { FaRegHeart } from "react-icons/fa"

export default function RecipeItem() {
  const allRecipeItems = useLoaderData()
  const path = window.location.pathname === '/myRecipe'

  return (
    <div className="bg-gray-100 py-12 px-6">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-tight">
        Latest Recipes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {Array.isArray(allRecipeItems) && allRecipeItems.length > 0 ? (
          allRecipeItems.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white rounded-2xl shadow-md p-5 flex gap-5 items-start hover:shadow-xl transition duration-300"
            >
              <img
                src={`http://localhost:4000/api/v1/Images/${item.image}`}
                alt="img"
                className="h-28 w-32 object-cover rounded-xl"
              />
              <div className="flex flex-col justify-between gap-3 w-full">
                <div className="text-xl font-semibold text-gray-800">
                  {item.title}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaStopwatch className="text-blue-500" />
                    <span>{item.time}</span>
                  </div>

                  {!path ? (
                    <FaRegHeart className="text-red-500 cursor-pointer hover:scale-110 transition" />
                  ) : (
                    <div className="flex items-center gap-3 text-lg">
                      <Link to={`/editRecipe/${item._id}`}>
                        <FaRegEdit className="text-green-600 cursor-pointer hover:scale-110 transition" />
                      </Link>
                      <MdDelete className="text-red-600 cursor-pointer hover:scale-110 transition" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No recipes to display</p>
        )}
      </div>
    </div>
  )
}
