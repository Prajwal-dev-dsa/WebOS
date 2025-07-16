import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState(""); //username of the client
  const [password, setPassword] = useState(""); //password of the client
  const navigate = useNavigate(); //navigate to the desktop page

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        //hit the register endpoint of the server
        username,
        password,
      });

      localStorage.setItem("token", res.data.token); //store the token in the local storage
      toast.success("Account created 🎉 Logging you in...");
      navigate("/desktop"); //navigate to the desktop page
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form
        onSubmit={handleRegister}
        className="bg-black/50 p-8 rounded-xl shadow-xl w-[350px] text-white backdrop-blur-none"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 rounded placeholder-white border-1 border-gray-400 outline-none"
        />

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded placeholder-white border-1 border-gray-400 outline-none"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 cursor-pointer hover:bg-blue-600 rounded text-white font-medium"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
