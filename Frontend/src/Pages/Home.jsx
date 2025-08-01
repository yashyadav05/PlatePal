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
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-20 bg-white flex-grow max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
              Discover & Share <br /> Delicious Recipes
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Dive into a world of culinary creations. From spicy curries to
              sweet treats, share your flavor with the PlatePal community.
            </p>
            <button
              onClick={addRecipe}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg font-semibold"
            >
              Share your recipe
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="food"
              className="rounded-full shadow-xl w-72 h-72 object-cover border-4 border-blue-100"
            />
          </div>
        </section>

        {/* SVG Wave */}
        <div className="-mt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#0099ff"
              fillOpacity="1"
              d="M0,64L21.8,74.7C43.6,85,87,107,131,144C174.5,181,218,235,262,229.3C305.5,224,349,160,393,149.3C436.4,139,480,181,524,202.7C567.3,224,611,224,655,218.7C698.2,213,742,203,785,170.7C829.1,139,873,85,916,69.3C960,53,1004,75,1047,106.7C1090.9,139,1135,181,1178,197.3C1221.8,213,1265,203,1309,192C1352.7,181,1396,171,1418,165.3L1440,160L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
            ></path>
          </svg>
        </div>

        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <InputForm setIsOpen={() => setIsOpen(false)} />
          </Modal>
        )}
      </div>

      {/* Recipes Section */}
      <div className="bg-gray-100">
        <RecipeItem allRecipeItems={allRecipeItems} />
      </div>
    </>
  );
}
