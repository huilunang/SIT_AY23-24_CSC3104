import { apiClient } from "./ApiClient";

export function getAllGallery() {
  try {
    return apiClient.get("/api/v1/gallery");
  } catch (error) {
    console.log(error);
  }
}

export function searchPOIByTermAndLocation(term, location) {
  try {
    return apiClient.get("/api/v1/poi/search", {
      params: { term, location }
    });
  } catch (error) {
    console.log(error);
  }
}