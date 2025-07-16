import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">Plate<span className="text-blue-500">Pal</span></h2>
          <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex space-x-6 text-sm font-medium">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
            Home
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
            About
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
