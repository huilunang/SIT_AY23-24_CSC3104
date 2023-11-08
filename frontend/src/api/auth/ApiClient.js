import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8081",
});

// export const axiosConfig = {
//   headers: {
//     Authorization: localStorage.getItem("jwtToken"), // Include your token here
//     "Content-Type": "application/json", // Adjust the content type as needed
//   },
// };
