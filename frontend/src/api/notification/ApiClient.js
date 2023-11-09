import axios from "axios";

export const notificationClient = axios.create({
  baseURL: "http://localhost:9090",
});

export const eventClient = axios.create({
  baseURL: "http://localhost:9090",
});
