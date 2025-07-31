import { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { FaStopwatch } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import axios from 'axios';

export default function RecipeItem() {
  const recipes = useLoaderData();
  const [allRecipeItems, setAllRecipeItems] = useState();
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
  const path = window.location.pathname === '/myRecipe';
  const [isFavRecipe, setIsFavRecipe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAllRecipeItems(recipes);
  }, [recipes]);

  const onDelete = async (id) => {
    await axios.delete(`https://platepal-sxnu.onrender.com/recipe/${id}`);
    setAllRecipeItems((recipes) => recipes.filter((recipe) => recipe._id !== id));
    const filteredFavs = favItems.filter((recipe) => recipe._id !== id);
    localStorage.setItem("fav", JSON.stringify(filteredFavs));
  };

  const favRecipe = async (item) => {
    let filtered = favItems.filter(recipe => recipe._id !== item._id);
    favItems = favItems.some(recipe => recipe._id === item._id) ? filtered : [...favItems, item];
    localStorage.setItem("fav", JSON.stringify(favItems));
    setIsFavRecipe(prev => !prev);
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-8">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        {path ? "Your Recipes" : "Latest Recipes"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {Array.isArray(allRecipeItems) && allRecipeItems.length > 0 ? (
          allRecipeItems.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white rounded-2xl shadow-lg p-4 flex gap-4 items-start hover:shadow-xl transition-all duration-300"
            >
              {/* Recipe Image */}
              <img
                src={`https://platepal-sxnu.onrender.com/Images/${item.coverImage}`}
                alt={item.title}
                className="h-28 w-32 object-cover rounded-xl border border-gray-200"
              />

              {/* Recipe Content */}
              <div className="flex flex-col justify-between w-full gap-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaStopwatch className="text-blue-500" />
                    <span>{item.time}</span>
                  </div>

                  {/* Action Buttons */}
                  {!path ? (
                    <FaRegHeart
                      onClick={() => favRecipe(item)}
                      style={{
                        color: favItems.some(res => res._id === item._id) ? "red" : "black"
                      }}
                      className="cursor-pointer hover:scale-110 transition"
                    />
                  ) : (
                    <div className="flex items-center gap-3 text-lg">
                      <Link to={`/editRecipe/${item._id}`}>
                        <FaRegEdit className="text-green-600 cursor-pointer hover:scale-110 transition" />
                      </Link>
                      <MdDelete
                        onClick={() => onDelete(item._id)}
                        className="text-red-600 cursor-pointer hover:scale-110 transition"
                      />
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
  );
}
