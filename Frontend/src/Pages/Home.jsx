import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import RecipeItem from "../Components/RecipeItem";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";
import InputForm from "../Components/InputForm";

export default function Home() {
  const allRecipeItems = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const addRecipe = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/addRecipe");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col pt-25">
        {/* Hero Section */}
        <section className="rounded-md flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex-grow max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-6">
              🍽️ Welcome to PlatePal
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Discover & Share <br /> 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Delicious Recipes
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Dive into a world of culinary creations. From spicy curries to
              sweet treats, share your flavor with the PlatePal community and connect with food lovers worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={addRecipe}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <span className="mr-2">✨</span>
                Share your recipe
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-50">
                Explore Recipes
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-purple-200 rounded-full opacity-60 animate-pulse delay-1000"></div>
              
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-2">
                <img
                  src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Delicious food presentation"
                  className="rounded-2xl w-80 h-80 sm:w-96 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -left-8 top-1/2 bg-white p-3 rounded-xl shadow-lg hidden lg:block">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">4.9</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Highly Rated</span>
                </div>
              </div>
              
              <div className="absolute -right-8 bottom-1/4 bg-white p-3 rounded-xl shadow-lg hidden lg:block">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">👨‍🍳</span>
                  <span className="text-sm font-medium text-gray-700">1000+ Chefs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Wave */}
        <div className="-mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="url(#gradient)"
              fillOpacity="1"
              d="M0,64L21.8,74.7C43.6,85,87,107,131,144C174.5,181,218,235,262,229.3C305.5,224,349,160,393,149.3C436.4,139,480,181,524,202.7C567.3,224,611,224,655,218.7C698.2,213,742,203,785,170.7C829.1,139,873,85,916,69.3C960,53,1004,75,1047,106.7C1090.9,139,1135,181,1178,197.3C1221.8,213,1265,203,1309,192C1352.7,181,1396,171,1418,165.3L1440,160L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
            >
            </path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <InputForm setIsOpen={() => setIsOpen(false)} />
          </Modal>
        )}
      </div>

      {/* Recipes Section */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-blue-600">Recipes</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover amazing recipes shared by our community of passionate home cooks and professional chefs
            </p>
          </div>
          <RecipeItem allRecipeItems={allRecipeItems} />
        </div>
      </div>
    </>
  );
}
