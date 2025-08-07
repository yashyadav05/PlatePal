import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Profile from '../assets/image.png';

export default function RecipeDetails() {
  const recipe = useLoaderData();
  console.log(recipe);

  return (
    <div className="bg-gray-50 min-h-screen py-30 px-4 sm:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-8">
        <div className="flex items-center gap-4">
          <img
            src={Profile}
            alt="User Profile"
            className="h-14 w-14 rounded-full border border-gray-300 object-cover"
          />
          <div>
            <p className="text-gray-600 text-sm">Recipe by</p>
            <h5 className="text-lg font-semibold text-gray-800">{recipe.email}</h5>
          </div>
        </div>
      </div>

      {/* Recipe Card */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">{recipe.title}</h3>

        <img
          src={recipe.coverImage}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-xl border mb-8"
        />

        {/* Ingredients */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-2">Ingredients</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {recipe.ingredients?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">Instructions</h4>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {recipe.instructions}
          </p>
        </div>
      </div>
    </div>
  );
}
