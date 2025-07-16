import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipeData);
    await axios
      .post("http://localhost:4000/recipe/", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/"));
  };

  const onHandleChange = (e) => {
    const { name, value, files } = e.target;
    const val =
      name === "ingredients"
        ? value.split(",")
        : name === "file"
        ? files[0]
        : value;
    setRecipeData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mt-14 mb-10 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Recipe</h2>

      <form onSubmit={onHandleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            onChange={onHandleChange}
            required
            placeholder="e.g. Spaghetti Bolognese"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            type="text"
            name="time"
            onChange={onHandleChange}
            required
            placeholder="e.g. 30 mins"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (comma separated)</label>
          <textarea
            name="ingredients"
            rows="4"
            required
            placeholder="e.g. tomato, onion, garlic"
            onChange={onHandleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
          <textarea
            name="instructions"
            rows="5"
            required
            placeholder="Step-by-step instructions..."
            onChange={onHandleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Image</label>
          <input
            type="file"
            name="file"
            required
            onChange={onHandleChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-gray-100 file:text-sm file:font-medium hover:file:bg-gray-200"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}
