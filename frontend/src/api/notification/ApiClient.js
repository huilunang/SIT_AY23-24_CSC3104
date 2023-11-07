import axios from "axios";

export const notificationClient = axios.create({
  baseURL: "http://localhost:8083",
});

export const eventClient = axios.create({
  baseURL: "http://localhost:8083",
});
