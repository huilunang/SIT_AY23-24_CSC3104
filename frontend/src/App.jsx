import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import ErrorPage from "./pages/error";
import RegisterPage from "./pages/register";
import GalleryPage from "./pages/gallery";

import AuthProvider from "./security/AuthContext.jsx";

import CustomNavbar from "./components/navbar";

function AuthenticatedRoute({ children }) {
  if (localStorage.getItem("isAuthenticated") === "true") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="FoodMining">
      <AuthProvider>
        <BrowserRouter>
          {isAuthenticated && <CustomNavbar />}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/gallery" /> : <LoginPage />
              }
            ></Route>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/gallery" /> : <LoginPage />
              }
            ></Route>
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/gallery" /> : <RegisterPage />
              }
            ></Route>

            <Route
              path="/gallery"
              element={
                isAuthenticated ? (
                  <AuthenticatedRoute>
                    <GalleryPage />
                  </AuthenticatedRoute>
                ) : (
                  <Navigate to="/" />
                )
              }
            ></Route>

            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
