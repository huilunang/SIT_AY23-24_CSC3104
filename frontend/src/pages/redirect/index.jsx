// HomePage.js

import { Navigate } from "react-router-dom";

import "./index.css"; // Import your CSS file

function RedirectPage({ children }) {
  if (localStorage.getItem("isAuthenticated") == "true") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default RedirectPage;
