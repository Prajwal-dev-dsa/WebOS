import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Desktop from "./pages/Desktop";
import StartMenu from "./components/StartMenu";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* login page */}
        <Route path="/register" element={<Register />} /> {/* register page */}
        {/* desktop page with private route security to prevent access to the desktop page if the user is not logged in */}
        <Route
          path="/desktop"
          element={
            <PrivateRoute>
              <Desktop /> {/* desktop page */}
              <StartMenu /> {/* start menu component */}
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster /> {/* toast notifications */}
    </div>
  );
}

export default App;
