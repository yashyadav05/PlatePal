import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const { axios } = useAppContext();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post("/recipe/", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onHandleChange = (e) => {
    const { name, value, files } = e.target;
    const val =
      name === "ingredients"
        ? value.split(",")
        : name === "file"
        ? files[0]
        : value;

    // Handle image preview
    if (name === "file" && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(files[0]);
    }

    setRecipeData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
            ✨ Share Your Creation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Add New <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Recipe</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your delicious creation with the PlatePal community and inspire other food lovers
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
          <form onSubmit={onHandleSubmit} className="space-y-8">
            {/* Two Column Layout for larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-xl mr-2">🍽️</span>
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={onHandleChange}
                    required
                    placeholder="e.g. Grandma's Special Spaghetti Bolognese"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 placeholder-gray-400 hover:border-gray-300"
                  />
                </div>

                {/* Time */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-xl mr-2">⏰</span>
                    Cooking Time
                  </label>
                  <input
                    type="text"
                    name="time"
                    onChange={onHandleChange}
                    required
                    placeholder="e.g. 45 minutes"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 placeholder-gray-400 hover:border-gray-300"
                  />
                </div>

                {/* Ingredients */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-xl mr-2">🥕</span>
                    Ingredients
                    <span className="text-xs text-gray-500 ml-2">(comma separated)</span>
                  </label>
                  <textarea
                    name="ingredients"
                    rows="5"
                    required
                    placeholder="e.g. 2 cups pasta, 1 lb ground beef, 1 onion diced, 3 cloves garlic minced, 2 cups tomato sauce"
                    onChange={onHandleChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 placeholder-gray-400 hover:border-gray-300"
                  />
                  <p className="text-xs text-gray-500 mt-2">💡 Tip: Separate each ingredient with a comma</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Instructions */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-xl mr-2">📝</span>
                    Instructions
                  </label>
                  <textarea
                    name="instructions"
                    rows="8"
                    required
                    placeholder="1. Heat oil in a large pan over medium heat
2. Add onions and cook until translucent
3. Add garlic and cook for 1 minute
4. Add ground beef and cook until browned
5. Add tomato sauce and simmer for 20 minutes
6. Serve over cooked pasta and enjoy!"
                    onChange={onHandleChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 placeholder-gray-400 hover:border-gray-300"
                  />
                </div>

                {/* File Upload */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-xl mr-2">📸</span>
                    Recipe Image
                  </label>
                  
                  <div className="relative">
                    <input
                      type="file"
                      name="file"
                      required
                      accept="image/*"
                      onChange={onHandleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                      {previewImage ? (
                        <div className="space-y-4">
                          <img
                            src={previewImage}
                            alt="Recipe preview"
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                          />
                          <p className="text-sm text-green-600 font-medium">✅ Image selected! Click to change</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl text-gray-400">📷</span>
                          </div>
                          <div>
                            <p className="text-gray-600 font-medium">Click to upload an image</p>
                            <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
              >
                <span className="mr-2">←</span>
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-8 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Recipe...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span>
                    Add Recipe
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-xl mr-2">💡</span>
            Pro Tips for Better Recipes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Use clear, step-by-step instructions</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Include specific measurements and quantities</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Upload a high-quality, appetizing photo</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Mention cooking tips and tricks</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Include preparation and cooking time</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Add serving size information</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
