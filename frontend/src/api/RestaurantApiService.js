import { apiClient } from "./ApiClient";

export function getAllRestaurantsByEmail() {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  return apiClient.post(
    "/home",
    { email },
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}
