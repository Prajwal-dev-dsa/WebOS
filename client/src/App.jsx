import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Desktop from "./pages/Desktop";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/desktop"
          element={
            <PrivateRoute>
              <Desktop />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
