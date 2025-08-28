import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import {  NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(!token);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  useEffect(() => {
    const tokens = localStorage.getItem("token");
    setIsLogin(!tokens);
  }, [token]);

  const checkLogin = () => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg py-4 px-4 fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div onClick={() => navigate("/")}  className="flex items-center cursor-pointer">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              <span className="inline-block transform hover:scale-110 transition-transform cursor-pointer">
                🍽️
              </span>
              Plate<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Pal</span>
            </h2>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-8 text-[17px] font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  🏠 Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/myRecipe"
                  onClick={(e) => {
                    if (isLogin) {
                      e.preventDefault();
                      setIsOpen(true);
                    }
                  }}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  📝 My Recipes
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/favRecipe"
                  onClick={(e) => {
                    if (isLogin) {
                      e.preventDefault();
                      setIsOpen(true);
                    }
                  }}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  ❤️ Favourites
                </NavLink>
              </li>
            </ul>

            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              {!isLogin && user?.email && (
                <div className="hidden xl:flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium truncate max-w-32">
                    {user.name}
                  </span>
                </div>
              )}

              <button
                onClick={checkLogin}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isLogin
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                }`}
              >
                {isLogin ? "🔐 Login" : "🚪 Logout"}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="px-4 py-6 bg-white border-t border-gray-100 shadow-lg">
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "text-blue-600 bg-blue-50 shadow-sm" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="text-xl">🏠</span>
                  <span className="font-medium">Home</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/myRecipe"
                  onClick={(e) => {
                    if (isLogin) {
                      e.preventDefault();
                      setIsOpen(true);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "text-blue-600 bg-blue-50 shadow-sm" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="text-xl">📝</span>
                  <span className="font-medium">My Recipes</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/favRecipe"
                  onClick={(e) => {
                    if (isLogin) {
                      e.preventDefault();
                      setIsOpen(true);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "text-blue-600 bg-blue-50 shadow-sm" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="text-xl">❤️</span>
                  <span className="font-medium">Favourites</span>
                </NavLink>
              </li>

              <li className="pt-4 border-t border-gray-100">
                {!isLogin && user?.email && (
                  <div className="flex items-center space-x-3 px-4 py-2 mb-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {user.email}
                    </span>
                  </div>
                )}

                <button
                  onClick={checkLogin}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isLogin
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}
                >
                  <span>{isLogin ? "🔐" : "🚪"}</span>
                  <span>{isLogin ? "Login" : "Logout"}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
