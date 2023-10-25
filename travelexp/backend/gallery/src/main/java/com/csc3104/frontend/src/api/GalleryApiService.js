import { apiClient } from "./apiClient";

export function getAllGallery() {
  try {
    return apiClient.get("/gallery");
  } catch (error) {
    console.log(error);
  }
}
