import { eventClient } from "./ApiClient";

export function getUserName(email) {
  const jwtToken = localStorage.getItem("jwtToken");

  return eventClient.get(`/events/user?email=${email}`, {
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
}

export function getAllEvents() {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  return eventClient.post(
    "/events/all",
    { email },
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function getAllParty(key) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  return eventClient.post(
    "/events/party",
    { key },
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function createEvent(
  key,
  title,
  date,
  time,
  description,
  invites,
  notify,
  type,
  status
) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  // Create a Date object with your date and time
  let localTimeStr = date + " " + time;
  let localTime = new Date(localTimeStr);

  // Obtain the Unix timestamp (milliseconds since Jan 1, 1970)
  const unixTimestampMillis = localTime.getTime();

  let invite = "";
  if (invites.length > 0) {
    invite = invites.toString();
  }

  return eventClient.post(
    `/events/push?to=${email}`,
    {
      key: key,
      owner: email,
      member: email,
      title: title,
      date: date,
      time: time,
      description: description,
      invites: invite,
      timestamp: unixTimestampMillis,
      type: type,
      notify: notify,
      status: status,
    }, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function pushEvent(
  key,
  owner,
  title,
  date,
  time,
  description,
  invites,
  notify,
  type,
  status
) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  // Create a Date object with your date and time
  let localTimeStr = date + " " + time;
  let localTime = new Date(localTimeStr);

  // Obtain the Unix timestamp (milliseconds since Jan 1, 1970)
  const unixTimestampMillis = localTime.getTime();

  let invite = "";
  if (invites.length > 0) {
    invite = invites.toString();
  }

  return eventClient.post(
    `/events/push?to=${email}`,
    {
      key: key,
      owner: owner,
      member: email,
      title: title,
      date: date,
      time: time,
      description: description,
      invites: invite,
      timestamp: unixTimestampMillis,
      type: type,
      notify: notify,
      status: status,
    }, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function deleteEvent(key, type) {
  const jwtToken = localStorage.getItem("jwtToken");

  return eventClient.post(
    `/events/delete`,
    {
      key: key,
      type: type,
    }, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function getPOIDetails(businessId) {
  const jwtToken = localStorage.getItem("jwtToken");

  return eventClient.get(`/events/${businessId}`, {
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
  });
}
