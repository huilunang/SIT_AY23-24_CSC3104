import { apiClient } from "./ApiClient";

export function getAllGallery() {
  try {
    return apiClient.get("/api/v1/gallery");
  } catch (error) {
    console.log(error);
  }
}

export function createGallery(title, imageFile) {
  try {
    return apiClient.post("/api/v1/gallery/create", { title, imageFile });
  } catch (error) {
    console.log(error);
  }
}
