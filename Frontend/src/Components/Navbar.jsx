import React from 'react';
import { useState } from 'react';
import Modal from './Modal';

export default function Navbar() {
  const [isOpen,setIsOpen] = useState(false)
  const checkLogin = ()=>{
    setIsOpen(true)
    console.log(isOpen)
  }
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
          <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Home</li>
          <li className="text-gray-600 hover:text-blue-500 cursor-pointer">My Recipe</li>
          <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Favourites</li>
          <li className="text-gray-600 hover:text-blue-500 cursor-pointer" onClick={checkLogin}>Login</li>
        </ul>
      </div>
    </header>
    {(isOpen) && <Modal onClose={()=>setIsOpen(false)}/>}
    </>
  );
}
