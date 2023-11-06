import React, { useEffect, useState } from "react";
import { getAllWishListItem, getPOIDetails, getListOfPOIDetailsByNearby } from "../../api/wishlist/WishListApiService";
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
    const [curatedPOIList, setCuratedPOIList] = useState([]);
    const [userCoordinates, setUserCoordinates] = useState([]);
    const [businessIdList, setBusinessIdList] = useState([]);

    const findCurrentLocation = () => {
      const success = (position) => {
      const latitude = position.coords.latitude.toString();
      const longitude = position.coords.longitude.toString();
      setUserCoordinates([latitude, longitude]);
      };
      const error = () => {
        console.log('Unable to retrieve your location');
      };
      navigator.geolocation.getCurrentPosition(success, error);
    };
  
    useEffect(() => {
      findCurrentLocation();
    }, []); // The empty dependency array ensures this only runs once

    const handleRefreshForNearby = async () => {
      try {
        const response = await getListOfPOIDetailsByNearby(userCoordinates);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchWishListItems = async () => {
      try {
        const response = await getAllWishListItem();
        const ids = response.data.map((item) => item.businessId);
        setBusinessIdList(ids);
        console.log("List of business ids", businessIdList);
      } catch (error) {
        console.error('Error fetching wish list items:', error);
      }
    };
    useEffect(() => {
      fetchWishListItems();
    }, []);

    useEffect(() => {
      if (data.length > 0) {
        const selectedIndices = new Set();
        const selectedPOIs = [];
        while (selectedIndices.size < 3) {
          const randomIndex = Math.floor(Math.random() * data.length);
          if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex);
            selectedPOIs.push(data[randomIndex]);
          }
        }
        setCuratedPOIList(selectedPOIs);
        console.log(curatedPOIList);
      }
    }, [data]);

    return (
        <div className="container">
        <br/><br/><br/>
        <h1>For you</h1>
          <button onClick={handleRefreshForNearby} className="btn btn-info">Refresh</button>    
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            {curatedPOIList.map((poi) => (
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
    );
}

export default WishList;
