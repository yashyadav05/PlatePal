import React, { useState } from "react";
import axios from 'axios'

export default function InputForm({setIsOpen}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error,setError] = useState("")
  const formsubmit = async(e)=> {
    e.preventDefault();
    let endpoint = (isSignup) ? "signup" : "login"
    await axios.post(`http://localhost:4000/api/v1/${endpoint}`,{email,password})
    .then((res)=>{
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("user",JSON.stringify(res.data.user))
      setIsOpen(false)
    }).catch((err) => {
      const apiError = err.response?.data;
      setError(apiError?.error || apiError?.message || "Something went wrong");
      console.error("Login error:", apiError); // debug log
    })
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={formsubmit}>
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

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          placeholder="🔒 your password"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        {isSignup ? "Signup" : "Login"}
      </button>
      {(error != "")&&<h6 className="text-red-700">{error}</h6>}
      <button onClick={() => setIsSignup(prev => !prev)}>
        {isSignup ? "Already have an account" : "Create new account"}
      </button>
    </form>
  );
}
