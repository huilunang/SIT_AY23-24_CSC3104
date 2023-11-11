import { apiClient } from "../ApiClient";

export function getAllGallery() {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.get(`/api/v1/gallery/${localStorage.getItem("email")}`, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export function getOneGallery(id) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.get(`/api/v1/gallery/album/${id}`, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export function createGallery(title, imageFile) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    const config = {
      headers: {
        Authorization: jwtToken,
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
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    const config = {
      headers: {
        Authorization: jwtToken,
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
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.delete(`/api/v1/gallery/album/${id}`, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export function getAllWishListItem() {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.get("/api/v1/wishlist", {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
    // return apiClient.get("/api/v1/wishlist/all");
  } catch (error) {
    console.log(error);
  }
}

export function getAllWishListItemByAlbumId(albumId) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.get(`/api/v1/wishlist/${albumId}`, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export function createWishListItem(payload) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.post(`/api/v1/wishlist/insert`, payload, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export function createUserCategories(payload) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.post(`/api/v1/wishlist/userCategories/insert`, payload, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export function updateUserCategories(payload) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.put(`/api/v1/wishlist/userCategories/update`, payload, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export function getUserCategories() {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.get(`/api/v1/wishlist/getCategories/${localStorage.getItem("email")}`, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// autocomplete suggestions to add to wishlist
export function getSuggestions(location, input) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.get(
      `/api/v1/poi/suggestions?location=${location}&userInput=${input}`,
      {
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}

// retrieve business details
export function getPOIDetails(wishlistId, businessId) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.get(`/api/v1/poi/${wishlistId}/${businessId}`, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// update poi remarks
export function updatePOIRemarks(wishlistId, businessId, remarks) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.put(
      `/api/v1/poi/${wishlistId}/${businessId}/remarks`,
      {
        remarks,
      },
      {
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}

// update poi visited
export function updatePOIVisited(wishlistId, businessId, visited) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    const config = {
      headers: {
        Authorization: jwtToken,
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


export function deleteWishListItemByObjectId(objectId) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.delete(`/api/v1/wishlist/delete/${objectId}`, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export function getPOIDetailsByBusinessId(businessId) {
  const jwtToken = localStorage.getItem("jwtToken");
  try {
    return apiClient.get(`/api/v1/poi/${businessId}`, {
      headers: {  
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export function getListOfPOIDetailsByNearby(location) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.get(`/api/v1/poi/nearby/${location}`, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export function getListOfPOIDetailsByCategories(categories, location) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    return apiClient.get(`/api/v1/poi/category/${categories}/${location}`, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
