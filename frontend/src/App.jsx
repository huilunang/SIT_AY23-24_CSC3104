import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import LogoutPage from "./pages/logout";
import RegisterPage from "./pages/register";
import WishListPage from "./pages/wishlist";
import POIPage from "./pages/poi";
import RandomizerPage from "./pages/randomizer";

import AuthProvider from "./security/AuthContext.jsx";

import HeaderComponent from "./components/header";
import POI from "./pages/poi";

function AuthenticatedRoute({ children }) {
  if (localStorage.getItem("isAuthenticated") == "true") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default function App() {
  return (
    <div className="FoodMining">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            {/* Routes to bypass authentication here */}
            <Route path="wishlist/:id" element={<WishListPage />}></Route>
            <Route path="poi/:id" element={<POIPage />}></Route>
            <Route path="randomizer" element={<RandomizerPage />}></Route>
            {/* Until here */}
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>

            <Route
              path="/home"
              element={
                <AuthenticatedRoute>
                  <HomePage />
                </AuthenticatedRoute>
              }
            ></Route>

            <Route path="/logout" element={<LogoutPage />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
