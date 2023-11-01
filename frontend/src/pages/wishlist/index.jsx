import React, { useEffect, useState } from "react";
import { getAllWishListItemByAlbumId } from "../../api/wishlist/WishListApiService";
import { useNavigate } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function WishList() {
    const [wishlistitemById, setWishlistitemById] = useState([]);
    let { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const [location, setLocation] = useState('Singapore'); // Default location
    const [userInput, setUserInput] = useState('');
    const [suggestions, setSuggestions] = useState({});

    // Fetch wish list items by album ID
    async function getWishListByAlbumId(id) {
        try {
            const res = await getAllWishListItemByAlbumId(id);
            if (res.status === 200) {
                setWishlistitemById(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleItemClick = (objectId) => {
        // console.log(id.toString());
        if (objectId) {
            const objectIdString = objectId.toString(); // Convert the ObjectId to a string
            navigate(`/gallery/wishlist/1/${objectIdString}`);
        }
      };
    
    useEffect(() => {
        getWishListByAlbumId(id.toString());
    }, [id]); // Trigger the effect when the albumId changes

    const handleModalShow = () => setShowModal(true);

    const handleInputChange = async (e) => {
        const input = e.target.value;
        setUserInput(input);

        try {
            const response = await fetch(`http://localhost:8080/api/v1/poi/suggestions?location=${location}&userInput=${input}`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSelect = (businessId) => {
        console.log('Selected business ID:', businessId);
        // Perform actions after selecting the business
    };


    const handleModalClose = () => setShowModal(false);

    return (
        <div className="container wishlist-container">
            <h1>WishList</h1>
            <table className="table table-bordered table-hover">
                <tbody>
                {wishlistitemById.map((wish, index) => (
                    <tr
                        key={index}
                        className={"table-light wishlist-item"}
                        onClick={() => handleItemClick(wish._id)}
                    >
                        <td>{wish.name}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Button variant="primary" onClick={handleModalShow}>
            Add New
            </Button>
            <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Place of Interest</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>POI Name</Form.Label>
                    <Form.Select onChange={(e) => setLocation(e.target.value)}>
                    <option value="Singapore">Singapore</option>
                    <option value="Johor Bahru">Johor Bahru</option>
                    {/* Add more location options */}
                    </Form.Select>

                    <Autocomplete
                    id="autocomplete"
                    value={userInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    options={Object.values(suggestions)}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Search for shops..."
                        variant="outlined"
                        />
                    )}
                    renderOption={(option) => <p>{option}</p>}
                    />

                    <Form.Select onChange={(e) => handleSelect(e.target.value)}>
                    {Object.entries(suggestions).map(([businessId, nameAndAddress]) => (
                        <option key={businessId} value={businessId}>
                        {nameAndAddress}
                        </option>
                    ))}
                    </Form.Select>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleModalClose}>
                Save Changes
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default WishList;
