import React, { useEffect, useState } from "react";
import { getAllWishListItemByAlbumId, createWishListItem } from "../../api/wishlist/WishListApiService";
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
    const [selectedBusinessId, setSelectedBusinessId] = useState('');
    const [selectedPOIName, setSelectedPOIName] = useState('');
    
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



    const handleItemClick = (businessId) => {
        if (businessId) {
            // const objectIdString = businessId.toString(); // Convert the ObjectId to a string
            navigate(`/POI/${businessId}`);
        }
      };
    
    useEffect(() => {
        getWishListByAlbumId(id.toString());
    }, [id]);

    const handleModalShow = () => setShowModal(true);

    const handleInputChange = async (e) => {
        const input = e.target.value;
        setUserInput(input);
        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/poi/suggestions?location=${location}&userInput=${input}`
            );
            const data = await response.json();
            setSuggestions(data);
            const keys = Object.keys(data);
            // const value = data[keys[0]][1];
            if (keys.length > 0) {
                handleSelect(keys[0]);
            }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
    };

    const handleSelect = (businessId) => {
        // Perform actions after selecting the business
        setSelectedBusinessId(businessId);
        setSelectedPOIName(suggestions[businessId][1])
        console.log('Selected business ID:', selectedBusinessId);
        console.log('Selected POI Name:', selectedPOIName);
    };


    const handleModalClose = () => setShowModal(false);

    const handleAddNewPOI = async () => {
        console.log("BUSINESS",selectedBusinessId);
        console.log("POI",selectedPOIName);
        if (selectedBusinessId) {
            const payload = {
                name: selectedPOIName,
                businessId: selectedBusinessId,
                albumId: id,
                remarks: "",
                visited: "false" // or "false" based on your requirement
            };
    
            try {
                const res = await createWishListItem(payload);
                if (res.status === 201) {
                    // Handle the success response
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (Object.keys(suggestions).length > 0) {
            navigate(`/POI/${selectedBusinessId}`);
        }
    };

    return (
        <div className="container wishlist-container">
            <h1>WishList</h1>
            <table className="table table-bordered table-hover">
                <tbody>
                {wishlistitemById.map((wish, index) => (
                    <tr
                        key={index}
                        className={"table-light wishlist-item"}
                        onClick={() => handleItemClick(wish.businessId)}
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
                    <Form.Select onChange={(e) => {setLocation(e.target.value)}}>
                    <option value="Singapore">Singapore</option>
                    <option value="Johor Bahru">Johor Bahru</option>
                    <option value="Sweden">Sweden</option>
                    {/* Add more location options */}
                    </Form.Select>
                    <br/>
                    <Form.Control
                    type="text"
                    placeholder="Search for shops..."
                    value={userInput}
                    onChange={handleInputChange}
                    />
                    <br/>
                    <Form.Select onChange={(e) => handleSelect(e.target.value)}>
                    {Object.entries(suggestions).map(([businessId, details]) => (
                        <option key={businessId} value={businessId}>
                        {details[0]}
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
                <Button variant="primary" onClick={handleAddNewPOI}>
                Add New
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default WishList;
