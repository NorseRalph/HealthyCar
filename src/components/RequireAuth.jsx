import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const userData = useSelector((state) => state.user.userData);
  const location = useLocation();

  if (!userData || !userData.token) {
    // Redirect to the login page, but pass the current location in state
    // so it can be accessed on the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
