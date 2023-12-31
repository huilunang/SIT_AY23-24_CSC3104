import { apiClient } from "../ApiClient";

export function getAllNotifications() {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  return apiClient.post(
    "/notification/past",
    { email },
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function readAllNotifications() {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  return apiClient.post(
    "/notification/read",
    { email },
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function scheduleNotification(
  key,
  title,
  date,
  time,
  description,
  invites,
  notify,
  type,
  url,
  dest
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
    console.log(invite);
    for (let i = 0; i < invites.length; i++) {
      apiClient.post(
        `/notification/schedule?to=${invites[i]}`,
        {
          key: key,
          owner: email,
          member: invites[i],
          title: title,
          date: date,
          time: time,
          description: description,
          invites: invite,
          timestamp: unixTimestampMillis,
          type: type + "-" + "request",
          notify: notify,
          status: "requested",
          url,
          dest
        }, // Pass the message in the request payload
        {
          headers: {
            Authorization: jwtToken,
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  return apiClient.post(
    `/notification/schedule?to=${email}`,
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
      status: "accepted",
      url: url,
      dest: dest
    }, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function scheduleInviteNotification(
  key,
  owner,
  title,
  date,
  time,
  description,
  invites,
  notify,
  type,
  status,
  url,
  dest
) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  // Create a Date object with your date and time
  let localTimeStr = date + " " + time;
  let localTime = new Date(localTimeStr);

  let invite = "";
  if (invites.length > 0) {
    invite = invites.toString();
  }

  // Obtain the Unix timestamp (milliseconds since Jan 1, 1970)
  const unixTimestampMillis = localTime.getTime();

  return apiClient.post(
    `/notification/schedule?to=${email}`,
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
      url: url,
      dest: dest
    }, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function friendRequest(member, notify, type, status) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");
  if (type == "friend-request") {
    return apiClient.post(
      `/notification/friend-request`,
      {
        owner: email,
        member: member,
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
  } else {
    return apiClient.post(
      `/notification/friend-request`,
      {
        owner: member,
        member: email,
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
}

export function deleteNotification(key) {
  const jwtToken = localStorage.getItem("jwtToken");
  return apiClient.post(
    `/notification/delete`,
    {
      key: key,
    }, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function eventInviteNotification(
  key,
  owner,
  member,
  title,
  date,
  time,
  description,
  invites,
  notify,
  type,
  status,
  url,
  dest
) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  return apiClient.post(
    `/notification/event-request`,
    {
      key: key,
      owner: owner,
      member: member,
      title: title,
      date: date,
      time: time,
      description: description,
      invites: invites,
      timestamp: "",
      type: type,
      notify: notify,
      status: status,
      url: url,
      dest: dest
    }, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}
