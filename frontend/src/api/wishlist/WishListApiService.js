import { apiClient } from "./ApiClient";

export function getAllGallery() {
  try {
    return apiClient.get("/api/v1/gallery");
  } catch (error) {
    console.log(error);
  }
}

export function getOneGallery(id) {
  try {
    return apiClient.get(`/api/v1/gallery/${id}`);
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
    formData.append("imageFile", imageFile);

    return apiClient.post("/api/v1/gallery/create", formData, config);
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

    return apiClient.put(`/api/v1/gallery/${id}`, formData, config);
  } catch (error) {
    console.log(error);
  }
}

export function deleteGallery(id) {
  try {
    return apiClient.delete(`/api/v1/gallery/${id}`);
  } catch (error) {
    console.log(error);
  }
}
