import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

export default function InputForm({ setIsOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const {axios} = useAppContext()

  const formsubmit = async (e) => {
    e.preventDefault();
    let endpoint = isSignup ? "signup" : "login";

    await axios
      .post(`/${endpoint}`, { name,email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIsOpen(false);
      })
      .catch((err) => {
        const apiError = err.response?.data;
        setError(apiError?.error || apiError?.message || "Something went wrong");
        toast.error("Login error:", apiError);
      });
  };

  return (
    <form
      className="flex flex-col gap-4 p-4 sm:p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto"
      onSubmit={formsubmit}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        {isSignup ? "Create an Account" : "Welcome Back"}
      </h2>
      <p className="text-center text-sm text-gray-500 mb-4">
        {isSignup ? "Please sign up to continue" : "Login to continue"}
      </p>
      {/* Name Field */}
      {isSignup && <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          placeholder="Enter You're name here"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>}

      {/* Email Field */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          required
          placeholder="✉️ your@gmail.com"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password Field */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          required
          placeholder="🔒 your password"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        {isSignup ? "Signup" : "Login"}
      </button>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded-md text-center">
          {error}
        </div>
      )}

      {/* Toggle Signup/Login */}
      <button
        type="button"
        onClick={() => setIsSignup((prev) => !prev)}
        className="text-sm text-blue-600 hover:underline text-center mt-1"
      >
        {isSignup ? "Already have an account?" : "Create new account"}
      </button>
    </form>
  );
}
