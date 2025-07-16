import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(!token);
  const user = JSON.parse(localStorage.getItem("user"));

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
  };

  return (
    <>
      <header className="bg-white shadow-sm py-3 px-4 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Plate<span className="text-blue-600">Pal</span>
          </h2>

          <ul className="hidden md:flex space-x-8 text-[17px] font-medium">
            <li>
              <NavLink
                to="/"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
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
                className="text-gray-700 hover:text-blue-600 transition"
              >
                My Recipe
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
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Favourites
              </NavLink>
            </li>

            <li
              className="text-gray-700 hover:text-blue-600 transition cursor-pointer"
              onClick={checkLogin}
            >
              {isLogin ? "Login" : "Logout"}
              {user?.email && (
                <span className="ml-1 text-sm text-gray-500 font-normal">
                  ({user.email})
                </span>
              )}
            </li>
          </ul>
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
