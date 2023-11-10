import React, { useEffect, useState } from "react";
import { getAllWishListItem, getPOIDetailsByBusinessId, getListOfPOIDetailsByNearby, getListOfPOIDetailsByCategories, getUserCategories } from "../../api/wishlist/WishListApiService";
import { useNavigate } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from "../../components/navbar";
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FaTrash } from 'react-icons/fa';




function WishList() {

  const [data, setData] = useState([]);
  const [curatedPOIListNearby, setCuratedPOIListNearby] = useState([]);
  const [curatedPOIListCategory, setCuratedPOIListCategory] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState([]);

  const [businessIdList, setBusinessIdList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [curatedCategories, setCuratedCategories] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve the "email" item from local storage
    const storedEmail = localStorage.getItem('email');

    // Update the state with the retrieved email value
    if (storedEmail) {
      setEmail(storedEmail);
      console.log("The current email is:", storedEmail);
    }
  }, []);

  // Find Current Location and set User Coordinates
  const findCurrentLocation = () => {
    const success = (position) => {
      const latitude = position.coords.latitude.toString();
      const longitude = position.coords.longitude.toString();
      setUserCoordinates([latitude, longitude]);
      console.log(userCoordinates);
    };
    const error = () => {
      console.log('Unable to retrieve your location');
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };
  useEffect(() => {
    findCurrentLocation();
  }, []);

  // Handle Refresh for Nearby POIs
  const handleRefreshForNearby = async () => {
    try {
      const response = await getListOfPOIDetailsByNearby(userCoordinates);
      const selectedPOIs = selectRandomItems(response.data, 3);
      setCuratedPOIListNearby(selectedPOIs);
    } catch (error) {
      console.error(error);
    }
  };
  // Handle Refresh by POI Category
  const handleRefreshForCategory = async () => {
    try {
      console.log("The Curated Categories", curatedCategories);
      let response = {};
      if (curatedCategories.length){
        console.log("IS NOT EMPTY");
        response = await getListOfPOIDetailsByCategories(curatedCategories, userCoordinates);
      }else{
        console.log("IS EMPTY", curatedCategories);
        response = await getListOfPOIDetailsByCategories([1], userCoordinates);
      }
      const selectedPOIs = selectRandomItems(response.data, 3);
      setCuratedPOIListCategory(selectedPOIs);
    } catch (error) {
      console.error(error);
    }
  };

  const getCuratedCategories = async (email) => {

    try {
  
      console.log("Attempting to pull categories for ", email);
      const response = await getUserCategories(email);
      // Handle bad response
      if(!response || !response.data) {
        throw new Error('Invalid response');
      }
      const { categories } = response.data;
      // Validate categories
      if(!categories || !Array.isArray(categories)) {
        throw new Error('Invalid categories format');
      }
      // Log success
      console.log("Successfully pulled categories: ", categories);
      // Set state or return categories
      setCuratedCategories(categories);
      // handleRefreshForCategory();
      // handleRefreshForNearby();
    } catch (error) {
  
      console.error(error);
      // Handle error
  
    }
  
  };
  useEffect(() => {
    getCuratedCategories(email.toString());
  }, [email]);



  // Randomizer to select 3
  // Method for selecting random items from the data list
  const selectRandomItems = (data, setSize) => {
    const selectedIndices = new Set();
    const selectedItems = [];
    while (selectedIndices.size < setSize && selectedIndices.size < data.length) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!selectedIndices.has(randomIndex)) {
        selectedIndices.add(randomIndex);
        selectedItems.push(data[randomIndex]);
      }
    }
    return selectedItems;
  };

  // Set curated POI list using the randomizer method
  useEffect(() => {
    if (data.length > 0) {
      const selectedPOIs = selectRandomItems(data, 3);
      // setCuratedPOIListNearby(selectedPOIs);
    }
  }, [data]);

  // User Interface
  return (
    <>
    <CustomNavbar />
    <div className="container">
      <br />
      <h1>For you</h1>
      <div>
        <button onClick={handleRefreshForCategory} className="btn btn-info">Refresh</button>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {curatedPOIListCategory.map((poi) => (
            <div key={poi.name} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
              <img src={poi.imageUrl} alt="POI Image" style={{ width: '400px', height: '300px' }} />
              <p>Name: {poi.name}</p>
              <p>Category: {poi.category}</p>
              <p>Address: {poi.address}</p>
              <p>Rating: {poi.rating}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>Nearby you</h1>
        <button onClick={handleRefreshForNearby} className="btn btn-info">Refresh</button>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {curatedPOIListNearby.map((poi) => (
            <div key={poi.name} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
              <img src={poi.imageUrl} alt="POI Image" style={{ width: '400px', height: '300px' }} />
              <p>Name: {poi.name}</p>
              <p>Category: {poi.category}</p>
              <p>Address: {poi.address}</p>
              <p>Rating: {poi.rating}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Curated Categories:</h2>
        <ul>
          {curatedCategories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>
    </div></>
  );
}

export default WishList;
