// HomePage.js

import React, { useEffect, useState } from "react";
import "./index.css"; // Import your CSS file
// import { getAllRestaurantsByEmail } from "../../api/RestaurantApiService";

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);

  const [testing, setTesting] = useState("");

  function callGetAllRestaurantsByEmailApi() {
    getAllRestaurantsByEmail()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function successfulResponse(response) {
    // setRestaurants(response.data);
    setTesting(response.data);
    console.log("successful. here's data " + response.data);
  }

  function errorResponse(error) {
    console.log(error);
  }

  useEffect(() => callGetAllRestaurantsByEmailApi(), []);

  return (
    <div className="HomePage">
      <div className="content">
        <h1>Home Page</h1>
      </div>

      <div>{testing}</div>

      {/* <h2>List of Restaurants</h2>
      <div className="text-info">
        {restaurants.map((restaurant) => (
          <div key={restaurant.name}>
            <p>Name: {restaurant.name}</p>
            <p>Open: {restaurant.open ? "Yes" : "No"}</p>
            <hr />
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default HomePage;
