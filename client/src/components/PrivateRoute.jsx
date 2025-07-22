import { Navigate } from "react-router-dom";

//this is a private route component that checks if the user is logged in and if not, it redirects to the login page and if the user is logged in, it returns the children component. This is used to protect the routes that are only accessible to logged in users.

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
