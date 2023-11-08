import { useEffect, useState, useRef } from "react";
import "./index.css";
import {
  getAllFriendsById,
  getFriendDetailsById,
  listFriendRequests,
  searchUsersByName,
  makeFriendRequest,
  addFriend,
  removeFriendRequest,
  removeFriend,
} from "../../api/friends/FriendsApiService";
import CustomNavbar from "../../components/navbar";
import { friendRequest } from "../../api/notification/NotificationApiService"; 

function FriendsPage() {
  // Init variables
  const [friends, setFriends] = useState([]);
  const [friendDetails, setFriendDetails] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  const dropdownRef = useRef(null);

  /* Initialised APIs */

  // List of Friends (Email only)
  function callGetAllFriendsByIdApi() {
    getAllFriendsById()
      .then((response) => {
        successfulFriendsResponse(response);
        callGetFriendDetailsByIdApi(response.data); // Call to get friend details
        callListFriendRequestsApi(); // Call to get friend requests
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Friends API cleanup"));
  }

  // List of Friend Details (Not just email)
  function callGetFriendDetailsByIdApi(friendsData) {
    getFriendDetailsById(friendsData)
      .then((response) => successfulMapResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Map API cleanup"));
  }

  // List Friend Requests
  function callListFriendRequestsApi() {
    listFriendRequests()
      .then((response) => {
        setFriendRequests(response.data);
        console.log(
          "Friend Requests API successful. Here's data: " +
            JSON.stringify(response.data)
        );
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Friend Requests API cleanup"));
  }

  // Send notification from friend request

  async function friendRequestApi(receipent) { 
    try { 
        await friendRequest(receipent, "false", "friend-request", "requested") 
            .then((response) => successfulResponse(response)) 
            .catch((error) => errorResponse(error)) 
            .finally(() => console.log("cleanup")); 
        } catch (error) { 
        console.error("An error occurred:", error); 
    } 
  } 

  /*
  async function handleAcceptFriendRequest(senderEmail) {  
    try {
      const response = await addFriend(senderEmail);    
      successfulFriendRequestResponse(response);
      setFriends((prevFriends) => [...prevFriends, senderEmail]);
    // Update friend details after successfully adding a friend    
      await callGetAllFriendsByIdApi(); // This will update both friends and friend details
    } catch (error) {    
      errorResponse(error);
    } finally {    
      console.log("Map API cleanup");
  }}

  // Reject the friend request (With the sender's email)
  async function handleRejectFriendRequest(senderEmail) {  
    try {
      const response = await removeFriendRequest(senderEmail);    
      successfulRejectFriendRequestResponse(response);
    } catch (error) {    
      errorResponse(error);
  } finally {    
    console.log("Map API cleanup");
  }}
*/

  /* Initialised Responses*/

  // Init response
  function successfulFriendsResponse(response) {
    console.log(
      "Friends API successful. Here's data: " + JSON.stringify(response.data)
    );
  }

  function successfulMapResponse(response) {
    setFriendDetails(response.data);
    console.log(
      "Map API successful. Here's data: " + JSON.stringify(response.data)
    );
  }

  function successfulRejectFriendRequestResponse(response) {
    callListFriendRequestsApi();
    console.log(
      "Friends API successful. Here's data: " + JSON.stringify(response.data)
    );
  }

  function successfulFriendRequestResponse(response) {
    callListFriendRequestsApi();
    console.log(
      "Friends API successful. Here's data: " + JSON.stringify(response.data)
    );
  }

  function successfulResponse(response) {
    console.log("Successful. Here's data: " + JSON.stringify(response.data));
  }

  function errorResponse(error) {
    console.log(error);
  }

  /* Frontend control handlers */

  // Search for someone via name
  function handleSearch() {
    // Perform the search by calling the API function
    searchUsersByName(searchQuery)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => errorResponse(error));
  }

  // Make a request to someone
  function handleAddFriend(userEmail) {
    makeFriendRequest(userEmail)
      .then((response) => {
        successfulResponse(response);
        if (response.data === true) {
          setSearchMessage("Friend request sent successfully");
        } else {
          setSearchMessage("Failed to send friend request");
        }
        setFriends((prevFriends) => [...prevFriends, userEmail]);
        friendRequestApi(userEmail);

        // Call notifs method here

        // Update friend details after successfully adding a friend
        callGetAllFriendsByIdApi(); // This will update both friends and friend details
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Map API cleanup"));
  }
  

  // Remove your friend >:((
  function handleRemoveFriend(friendId) {
    removeFriend(friendId)
      .then((response) => {
        successfulFriendsResponse(response);
        // Update the local state to remove the friend
        setFriends((prevFriends) =>
          prevFriends.filter((email) => email !== friendId)
        );

        // Update friend details after successfully removing a friend
        callGetAllFriendsByIdApi(); // This will update both friends and friend details
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Map API cleanup"));
  }

  // Accept the friend request (With the sender's email)
  function handleAcceptFriendRequest(senderEmail) {
    addFriend(senderEmail)
      .then((response) => {
        successfulFriendRequestResponse(response);
        setFriends((prevFriends) => [...prevFriends, senderEmail]);

        // Update friend details after successfully adding a friend
        callGetAllFriendsByIdApi(); // This will update both friends and friend details)
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Map API cleanup"));
  }

  // Reject the friend request (With the sender's email)
  function handleRejectFriendRequest(senderEmail) {
    removeFriendRequest(senderEmail)
      .then((response) => successfulRejectFriendRequestResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Map API cleanup"));
  }

  // Initialise and set page variables
  useEffect(() => {
    const fetchData = async () => {
      try {
        const friendsResponse = await getAllFriendsById();
        const friendDetailsResponse = await getFriendDetailsById(
          friendsResponse.data
        );

        setFriends(friendsResponse.data);
        setFriendDetails(friendDetailsResponse.data);
        callListFriendRequestsApi(); // Call to get friend requests
      } catch (error) {
        errorResponse(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]); // Close the dropdown by clearing the search results
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <>
    <CustomNavbar/>
    <div className="FriendPage">
      <div className="friends-section">
        <div className="search-bar">
          <h2>Your Friends</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Add a Friend"
          />
          <button onClick={handleSearch}>Search</button>
          <div
            className={
              searchMessage.includes("successful")
                ? "search-message-green"
                : "search-message-red"
            }
          >
            {searchMessage}
          </div>
          <div ref={dropdownRef} className={Object.keys(searchResults).length > 0 ? "search-dropdown show" : "search-dropdown"}>
            {Object.values(searchResults).map((user) => (
              <div key={user.email} className="search-result">
                <p>{user.name}</p>
                <button onClick={() => handleAddFriend(user.email)}>
                  Add Friend
                </button>
              {/* Render additional details here */}
              </div>
            ))}
          </div>
        </div>

        <div className="friend-list">
          {Object.keys(friendDetails).length === 0 ? (
            <div className="no-mapping-message">
              <p>No friends available</p>
            </div>
          ) : (
            Object.keys(friendDetails).map((friendId) => (
              <div key={friendId} className="friend-box">
                <p>{friendDetails[friendId].name}</p>
                <button onClick={() => handleRemoveFriend(friendId)}>
                  Remove
                </button>
                {/* Render additional details here */}
              </div>
            ))
          )}
        </div>
      </div>
      <br></br>
      <h2>Pending</h2>
      {Object.keys(friendRequests).length === 0 ? (
        <div className="no-mapping-message">
          <p>No pending friend requests</p>
        </div>
      ) : (
        <div>
          {Object.keys(friendRequests).map((request) => (
            <div key={request} className="request-box">
              <p>{friendRequests[request].name}</p>
              <div className="request-buttons">
                <button onClick={() => handleAcceptFriendRequest(request)}>
                  Accept
                </button>
                <button onClick={() => handleRejectFriendRequest(request)}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
  
}

export default FriendsPage;
