import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <h2 className="text-3xl font-bold text-white">
                <span className="text-2xl mr-2">🍽️</span>
                Plate<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Pal</span>
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Connect food lovers worldwide through delicious recipes and culinary experiences. 
              Share, discover, and create amazing dishes together.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
                <span className="text-green-400">👨‍🍳</span>
                <span className="text-sm font-medium">10K+ Chefs</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>🏠</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>📝</span>
                  <span>My Recipes</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>❤️</span>
                  <span>Favourites</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>✨</span>
                  <span>Add Recipe</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Community</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>📱</span>
                  <span>Mobile App</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>📧</span>
                  <span>Newsletter</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Blog</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>💬</span>
                  <span>Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 font-medium">Follow us:</span>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-white font-bold text-sm">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-white font-bold text-sm">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-white font-bold text-sm">🐦</span>
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-white font-bold text-sm">▶</span>
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} PlatePal. Made with ❤️ for food lovers everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
}
