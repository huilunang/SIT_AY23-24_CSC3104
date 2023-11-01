import { apiClient } from "./ApiClient";

export function getAllGallery() {
  try {
    return apiClient.get("/api/v1/gallery");
  } catch (error) {
    console.log(error);
  }
}

// testing based on specific business ID
export function getPOIDetails() {
  try {
    return apiClient.get("/api/v1/poi/rSRC0t8hLeTQsOzmgQfUEA");
  } catch (error) {
    console.log(error);
  }
}

