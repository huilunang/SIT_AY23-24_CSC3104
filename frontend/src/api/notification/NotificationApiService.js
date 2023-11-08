import { notificationClient } from "./ApiClient";

export function getAllNotifications() {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  return notificationClient.post(
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

  return notificationClient.post(
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

export function scheduleNotification(key, title, date, time, description, invites, notify, type) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  // Create a Date object with your date and time
  let localTimeStr  = date + ' ' + time;
  let localTime  = new Date(localTimeStr);

  // Obtain the Unix timestamp (milliseconds since Jan 1, 1970)
  const unixTimestampMillis = localTime.getTime();

  let invite = '';
  if (invites.length > 0) {
    invite = invites.toString();
    console.log(invite)
    for (let i = 0; i < invites.length; i++) {
      notificationClient.post(
        `/notification/schedule?to=${invites[i]}`,
        { key:key, owner:email, member:invites[i], title:title, date:date, time:time, description:description, invites:invite, timestamp:unixTimestampMillis, type:type+'-'+'request', notify:notify, status:'requested'}, // Pass the message in the request payload
        {
          headers: {
            Authorization: jwtToken,
            "Content-Type": "application/json",
          },
        }
      );      
    }
  }

  return notificationClient.post(
    `/notification/schedule?to=${email}`,
    { key:key, owner:email, member:email, title:title, date:date, time:time, description:description, invites:invite, timestamp:unixTimestampMillis, type:type, notify:notify, status:'accepted'}, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function scheduleInviteNotification(key, owner, title, date, time, description, invites, notify, type, status) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  // Create a Date object with your date and time
  let localTimeStr  = date + ' ' + time;
  let localTime  = new Date(localTimeStr);

  let invite = '';
  if (invites.length > 0) {
    invite = invites.toString();
  }
  
  // Obtain the Unix timestamp (milliseconds since Jan 1, 1970)
  const unixTimestampMillis = localTime.getTime();

  return notificationClient.post(
    `/notification/schedule?to=${email}`,
    { key:key, owner:owner, member:email, title:title, date:date, time:time, description:description, invites:invite, timestamp:unixTimestampMillis, type:type, notify:notify, status:status}, // Pass the message in the request payload
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
  if (type == "friend-request"){
    return notificationClient.post(
      `/notification/friend-request`,
      { owner:email, member:member, type:type, notify:notify, status:status}, // Pass the message in the request payload
      {
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
      }
    );  
  } else {
    return notificationClient.post(
      `/notification/friend-request`,
      { owner:owner, member:member, type:type, notify:notify, status:status}, // Pass the message in the request payload
      {
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
      }
    );  
  }
}

export function deleteInviteNotification(key, owner, title, date, time, description, invites, notify, type, status) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  // Create a Date object with your date and time
  let localTimeStr  = date + ' ' + time;
  let localTime  = new Date(localTimeStr);

  let invite = '';
  if (invites.length > 0) {
    invite = invites.toString();
  }
  
  // Obtain the Unix timestamp (milliseconds since Jan 1, 1970)
  const unixTimestampMillis = localTime.getTime();

  return notificationClient.post(
    `/notification/delete`,
    { key:key, owner:owner, member:email, title:title, date:date, time:time, description:description, invites:invite, timestamp:unixTimestampMillis, type:type, notify:notify, status:status}, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export function eventInviteNotification(key, owner, member, title, date, time, description, invites, notify, type, status) {
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwtToken");

  
  return notificationClient.post(
    `/notification/event-request`,
    { key:key, owner:owner, member:member, title:title, date:date, time:time, description:description, invites:invites, timestamp:'', type:type, notify:notify, status:status}, // Pass the message in the request payload
    {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
}