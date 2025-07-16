import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState(""); //username of the client
  const [password, setPassword] = useState(""); //password of the client

  const navigate = useNavigate(); //navigate to the desktop page

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", //hit the login endpoint of the server
        { username, password }
      );
      localStorage.setItem("token", response.data.token); //store the token in the local storage
      toast.success("Login successful");
      navigate("/Desktop"); //navigate to the desktop page
    } catch (error) {
      toast.error(error?.response?.data?.message || "Uh oh! An error occurred");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-black/50 p-8 rounded-xl shadow-xl w-[350px] text-white backdrop-blur-none"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Sign in to WebOS
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 rounded placeholder-white border-1 border-gray-400 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded placeholder-white border-1 border-gray-400 outline-none"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 cursor-pointer hover:bg-blue-600 rounded text-white font-medium"
        >
          Log In
        </button>

        <p className="text-sm mt-4 font-normal text-center">
          Don't have an account?{" "}
          <a href="/register" className="underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
