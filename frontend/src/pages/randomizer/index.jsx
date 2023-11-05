import React, { useEffect, useState } from "react";
import { getPOIDetails, getListOfPOIDetails } from "../../api/wishlist/WishListApiService";
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

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await getListOfPOIDetails('Jurong');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
        }
        fetchData();
    }, []);

    



    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        {data.map((poi) => (
            <div key={poi.name} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <img src={poi.imageUrl} alt="POI Image" style={{ width: '100px', height: '100px' }} />
            <p>Name: {poi.name}</p>
            <p>Category: {poi.category}</p>
            <p>Address: {poi.address}</p>
            <p>Rating: {poi.rating}</p>
            </div>
        ))}
        </div>
    );
}

export default WishList;
