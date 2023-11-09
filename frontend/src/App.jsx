import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import ErrorPage from "./pages/error";
import RegisterPage from "./pages/register";
import GalleryPage from "./pages/gallery";
import WishListPage from "./pages/wishlist";
import POIPage from "./pages/poi";
import RandomizerPage from "./pages/randomizer";
import EventPage from "./pages/events";
import FriendsPage from "./pages/friends";
import EventPOIPage from "./pages/eventsPoi";

import AuthProvider from "./security/AuthContext.jsx";

function AuthenticatedRoute({ children }) {
  if (localStorage.getItem("isAuthenticated") == "true") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="TravelExp">
      <AuthProvider>
        <BrowserRouter>
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
              path="/friends"
              element={
                <AuthenticatedRoute>
                  <FriendsPage />
                </AuthenticatedRoute>
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
              path="poi/:wishlistId/:businessId"
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
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/events"
              element={
                <AuthenticatedRoute>
                  <EventPage />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/events/:businessId"
              element={
                <AuthenticatedRoute>
                  <EventPOIPage />
                </AuthenticatedRoute>
              }
            ></Route>

            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
