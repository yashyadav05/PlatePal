import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Left: Brand or Copyright */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">Food Recipe</h2>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Home
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
