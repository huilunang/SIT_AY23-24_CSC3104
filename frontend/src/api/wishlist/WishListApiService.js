import { apiClient } from "./ApiClient";

export function getAllGallery() {
  try {
    return apiClient.get(`/api/v1/gallery/${localStorage.getItem("email")}`);
  } catch (error) {
    console.log(error);
  }
}

export function getOneGallery(id) {
  try {
    return apiClient.get(`/api/v1/gallery/album/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export function createGallery(title, imageFile) {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("title", title);
    formData.append("email", localStorage.getItem("email"));
    formData.append("imageFile", imageFile);

    return apiClient.post("/api/v1/gallery/album/create", formData, config);
  } catch (error) {
    console.log(error);
  }
}

export function updateGallery(id, title, imageFile) {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("title", title);
    formData.append("imageFile", imageFile);

    return apiClient.put(`/api/v1/gallery/album/${id}`, formData, config);
  } catch (error) {
    console.log(error);
  }
}

export function deleteGallery(id) {
  try {
    return apiClient.delete(`/api/v1/gallery/album/${id}`);
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

export function deleteWishListItemByBusinessId(businessId) {
  try {
    return apiClient.delete(`/api/v1/wishlist/delete/${businessId}`);
  } catch (error) {
    console.error(error);
  }
}

// autocomplete suggestions to add to wishlist
export function getSuggestions(location, input) {
  try {
    return apiClient.get(
      `/api/v1/poi/suggestions?location=${location}&userInput=${input}`
    );
  } catch (error) {
    console.error(error);
  }
}

// retrieve business details
export function getPOIDetails(wishlistId, businessId) {
  try {
    return apiClient.get(`/api/v1/poi/${wishlistId}/${businessId}`);
  } catch (error) {
    console.log(error);
  }
}

// update poi remarks
export function updatePOIRemarks(wishlistId, businessId, remarks) {
  try {
    return apiClient.put(`/api/v1/poi/${wishlistId}/${businessId}/remarks`, {
      remarks,
    });
  } catch (error) {
    console.error(error);
  }
}

// update poi visited
export function updatePOIVisited(wishlistId, businessId, visited) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return apiClient.put(
      `/api/v1/poi/${wishlistId}/${businessId}/visited`,
      visited,
      config
    );
  } catch (error) {
    console.error(error);
  }
}
