import { apiClient } from "../ApiClient";

export function getAllFriendsById() {
  const jwtToken = localStorage.getItem("jwtToken");
  const email = localStorage.getItem("email"); // Or retrieve the ID from wherever it's coming in your application

  return apiClient.get('/friends/getFriends', {
    params: {
      email: email,
    },
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
  
}

export function searchUsersByName(email) {
  const jwtToken = localStorage.getItem("jwtToken");

  return apiClient.get('/friends/getUsersByName', {
    params: {
      email: email,
    },
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
  
}

export function getFriendDetailsById(friends) {
  console.log(friends);
  const jwtToken = localStorage.getItem("jwtToken");

  return apiClient.post("/friends/listFriends", friends, {
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
}


export function addFriend(sender) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  const requestData = {
    email: email,
    sender: sender,
  };

  return apiClient.post("/friends/addFriend", requestData, {
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
}

export function removeFriend(friend) {
  const jwtToken = localStorage.getItem("jwtToken");
  const email = localStorage.getItem("email");

  const requestData = {
    email: email,
    friend: friend,
  };

  return apiClient.post("/friends/removeFriend", requestData, {
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
}

export function removeFriendRequest(sender) {
  const jwtToken = localStorage.getItem("jwtToken");
  const email = localStorage.getItem("email");

  const requestData = {
    email: email,
    sender: sender,
  };

  return apiClient.post("/friends/removeFriendRequest", requestData, {
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
}

export function makeFriendRequest(email) {
  const jwtToken = localStorage.getItem("jwtToken");
  const sender = localStorage.getItem("email");

  const requestData = {
    email: sender,
    recipient: email,
  };

  return apiClient.post("/friends/makeFriendRequest", requestData, {
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
}

export function checkIfFriend(email, email2) {
  const jwtToken = localStorage.getItem("jwtToken");

  const requestData = {
    email: email,
    user: email2,
  };

  return apiClient.post("/friends/checkFriend", requestData, {
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
}



export function listFriendRequests() {
  const jwtToken = localStorage.getItem("jwtToken");
  const email = localStorage.getItem("email");
  
  return apiClient.get('/friends/listFriendRequests', {
    params: {
      email: email,
    },
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
  
}
