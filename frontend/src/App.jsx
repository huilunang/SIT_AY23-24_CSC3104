import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
// import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import LogoutPage from "./pages/logout";
import RegisterPage from "./pages/register";
import Gallery from "./pages/gallery";

import AuthProvider from "./security/AuthContext.jsx";

import HeaderComponent from "./components/header";

function AuthenticatedRoute({ children }) {
  if (localStorage.getItem("isAuthenticated") == "true") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default function App() {
  return (
    <div className="TravelExp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>

            {/* <Route
              path="/home"
              element={
                <AuthenticatedRoute>
                  <HomePage />
                </AuthenticatedRoute>
              }
            ></Route> */}

            <Route path="/logout" element={<LogoutPage />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
