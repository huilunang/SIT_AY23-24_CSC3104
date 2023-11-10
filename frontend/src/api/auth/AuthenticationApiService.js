import { apiClient } from "../ApiClient";

export function executeJwtAuthenticationService(email, password) {
  return apiClient.post("/api/v1/auth/authenticate", { email, password });
}

export function executeAccountRegistration(
  firstname,
  lastname,
  email,
  password
) {
  return apiClient.post("/api/v1/auth/register", {
    firstname,
    lastname,
    email,
    password,
  });
}
