import React, { useEffect, useState } from "react";
import { getPOIDetails } from "../../api/wishlist/WishListApiService";
import { useNavigate } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FaTrash } from 'react-icons/fa';

function WishList() {
    return (
        <div className="container">
            Hello
        </div>
    );
}

export default WishList;
