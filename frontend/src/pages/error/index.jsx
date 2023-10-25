// ErrorPage.js

import React from "react";
import "./index.css"; // Import your CSS file

const ErrorPage = ({ message = "An error occurred" }) => {
  return (
    <div className="error-container">
      <h1>Oops! An error occurred</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
