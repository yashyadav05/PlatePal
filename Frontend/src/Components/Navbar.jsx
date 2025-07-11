import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);

  useEffect(()=>{
    setIsLogin(token ? false : true)
  },[token])

  const checkLogin = () => {
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    }else{
    setIsOpen(true);
    console.log(isOpen);
    }
    
  };

  return (
    <>
      <header className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <h2 className="text-2xl font-bold text-gray-800">
            Plate<span className="text-blue-500">Pal</span>
          </h2>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6">
            {" "}
            {/* NavLink to="/"  another way try it */}
            <li className="text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li onClick={()=>isLogin && setIsOpen(true)} className="text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink to={isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink>
            </li>
            <li onClick={()=>isLogin && setIsOpen(true)} className="text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink to={isLogin ? "/favRecipe" : "/"}>Favourites</NavLink>
            </li>
            <li
              className="text-gray-600 hover:text-blue-500 cursor-pointer"
              onClick={checkLogin}
            >
             {(isLogin)? "Login":"Logout"}
            </li>
          </ul>
        </div>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {" "}
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
