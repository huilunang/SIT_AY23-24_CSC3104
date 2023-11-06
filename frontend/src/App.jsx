import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
<<<<<<< HEAD
import ErrorPage from "./pages/error";
import RegisterPage from "./pages/register";
import GalleryPage from "./pages/gallery";
=======
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import LogoutPage from "./pages/logout";
import RegisterPage from "./pages/register";
import Gallery from "./pages/gallery";
>>>>>>> main
import WishListPage from "./pages/wishlist";
import POIPage from "./pages/poi";
import RandomizerPage from "./pages/randomizer";

import AuthProvider from "./security/AuthContext.jsx";

<<<<<<< HEAD
=======
import HeaderComponent from "./components/header";

>>>>>>> main
function AuthenticatedRoute({ children }) {
  if (localStorage.getItem("isAuthenticated") == "true") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default function App() {
<<<<<<< HEAD
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

=======
>>>>>>> main
  return (
    <div className="TravelExp">
      <AuthProvider>
        <BrowserRouter>
<<<<<<< HEAD
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
                <AuthenticatedRoute>
                  <GalleryPage />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/wishlist/:id"
              element={
                <AuthenticatedRoute>
                  <WishListPage />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/poi/:id"
              element={
                <AuthenticatedRoute>
                  <POIPage />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/randomizer"
              element={
                <AuthenticatedRoute>
                  <RandomizerPage />
=======
          <HeaderComponent />
          <Routes>
            {/* Routes to bypass authentication here */}
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="wishlist/:id" element={<WishListPage />}></Route>
            <Route path="poi/:wishlistId/:businessId" element={<POIPage />}></Route>
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
>>>>>>> main
                </AuthenticatedRoute>
              }
            ></Route>

<<<<<<< HEAD
=======
            <Route path="/logout" element={<LogoutPage />}></Route>
>>>>>>> main
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
