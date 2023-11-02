import { apiClient } from "./ApiClient";

export function getAllGallery() {
  try {
    return apiClient.get("/api/v1/gallery");
  } catch (error) {
    console.log(error);
  }
}

export function getAllWishListItem() {
  try {
    return apiClient.get("/api/v1/wishlist");
  } catch (error) {
    console.log(error);
  }
}

export function getAllWishListItemByAlbumId(albumId) {
  try {
    return apiClient.get(`/api/v1/wishlist/${albumId}`);
  } catch (error) {
    console.error(error);
  }
}

export function createWishListItem(payload) {
  try {
    return apiClient.post(`/api/v1/wishlist/insert`, payload);
  } catch (error) {
    console.error(error);
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


