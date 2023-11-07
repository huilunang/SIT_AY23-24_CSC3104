import React, { useEffect, useState } from "react";
import { getAllWishListItem, getPOIDetailsByBusinessId, getListOfPOIDetailsByNearby, getListOfPOIDetailsByCategories } from "../../api/wishlist/WishListApiService";
import { useNavigate } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  
  const handleRefreshForCategory = async () => {
    try {
      console.log(curatedCategories);
      const response = await getListOfPOIDetailsByCategories(curatedCategories, userCoordinates);
      const selectedPOIs = selectRandomItems(response.data, 3);
      setCuratedPOIListCategory(selectedPOIs);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Wish List Items
  const fetchWishListItems = async () => {
    try {
      const response = await getAllWishListItem();
      const ids = response.data.map((item) => item.businessId.toString());
      setBusinessIdList(ids);
      fetchPOIDetailsAndCategories(ids); // Moved function call
    } catch (error) {
      console.error('Error fetching wish list items:', error);
    }
  };
  useEffect(() => {
    fetchWishListItems();
  }, []);


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


  // Fetch POI Details and Create Categories
  const fetchPOIDetailsAndCategories = async (businessIdList) => {
    try {
      const categories = [];
      const poiDetailsList = [];
      if (businessIdList.length > 0) {

        for (let i = 0; i < businessIdList.length; i++) {
          const response = await getPOIDetailsByBusinessId(businessIdList[i]);
          if (response && response.data) {
            const { category } = response.data;
            const categoryArray = category.split(',').map((item) => item.trim().toLowerCase()); // Convert each category to lowercase
            categories.push(...categoryArray);
            poiDetailsList.push(response.data);
          }
        }
      }
      createCuratedCategories(categories);
    } catch (error) {
      console.error('Error fetching POI details:', error);
    }
  };


  // Create Curated Categories
  const createCuratedCategories = (categories) => {
    let categoryCount = {};
    categories.forEach(category => {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    let curatedCategories = Object.keys(categoryCount).sort((a, b) => categoryCount[b] - categoryCount[a]).slice(0, 4);

    setCuratedCategories(curatedCategories);
    // handleRefreshForCategory();
    // handleRefreshForNearby();
  };

  // User Interface
  return (
    <div className="container">
      <br /><br /><br />
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
    </div>
  );
}

export default WishList;
