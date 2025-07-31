import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-3 px-4 flex justify-center items-center">
      <div className="max-w-7xl mx-auto flex md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left flex gap-3 items-center justify-center">
          <h2 className="text-2xl font-bold text-white">Plate<span className="text-blue-500">Pal</span></h2>
          <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
// Copyright 2025 © NeuraBlog - All rights reserved.