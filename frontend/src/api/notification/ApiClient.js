import axios from "axios";

export const notificationClient = axios.create({
  baseURL: "http://localhost:8082",
});

export const eventClient = axios.create({
  baseURL: "http://localhost:8082",
});
