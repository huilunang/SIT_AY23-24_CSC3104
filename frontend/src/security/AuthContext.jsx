import { createContext, useState, useContext } from "react";
import {
  executeAccountRegistration,
  executeJwtAuthenticationService,
} from "../api/AuthenticationApiService";
import { HttpStatusResponse } from "../utils/enums";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [email, setEmail] = useState(null);

  const [token, setToken] = useState(null);

  async function register(firstname, lastname, email, password) {
    try {
      const response = await executeAccountRegistration(
        firstname,
        lastname,
        email,
        password
      );

      if (response.status == 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setEmail(email);
        setToken(jwtToken);
        localStorage.setItem("email", email);
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("isAuthenticated", "true");

        return HttpStatusResponse.OK;
      }
    } catch (error) {
      if (error.response.status == 409) {
        return HttpStatusResponse.USER_ALREADY_EXISTS;
      }
      return HttpStatusResponse.ERROR;
    }
  }

  async function login(email, password) {
    try {
      const response = await executeJwtAuthenticationService(email, password);

      if (response.status == 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setEmail(email);
        setToken(jwtToken);
        localStorage.setItem("email", email);
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("isAuthenticated", "true");

        // NOT OPEARTIONAL
        // apiClient.interceptors.request.use((config) => {
        //   console.log("intercepting and adding a token");
        //   config.headers.Authorization = localStorage.getItem("jwtToken");
        //   setEmail(localStorage.getItem("email"));
        //   setToken(localStorage.getItem("email"));
        //   return config;
        // });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
    }
  }

  function logout() {
    setAuthenticated(false);
    setEmail(null);
    setToken(null);
    localStorage.removeItem("email");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAuthenticated");
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, email, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
