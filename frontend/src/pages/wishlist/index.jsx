import React, { useEffect, useState } from "react";
import { getAllWishListItemByAlbumId, createWishListItem, deleteWishListItemByBusinessId, getSuggestions } from "../../api/wishlist/WishListApiService";
import { useNavigate } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FaTrash } from 'react-icons/fa';

function WishList() {
    const [wishlistitemById, setWishlistitemById] = useState([]);
    let { id } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [businessIdToDelete, setBusinessIdToDelete] = useState(null);
    const openDeleteModal = (businessId) => {
        setBusinessIdToDelete(businessId);
        setShowDeleteModal(true);
    };
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

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

    const handleItemClick = (businessId, wishlistId) => {
        if (businessId) {

            // const objectIdString = businessId.toString(); // Convert the ObjectId to a string
            navigate(`/poi/${wishlistId}/${businessId}`);
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
            const response = await getSuggestions(location, input);
            const data = response.data;
            setSuggestions(data);
            
            const keys = Object.keys(data);
            if (keys.length > 0) {
                setSelectedPOIName(data[keys[0]][1]);
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
                    window.location.reload();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDelete = async (businessId) => {
        console.log("Delete attempted, Business ID is:", businessId);
        try {
            await deleteWishListItemByBusinessId(businessId); 
            window.location.reload()
        } catch (error) {
            console.error('Error deleting wish list item:', error);
        }
        setShowDeleteModal(false);
    };

    return (
        <div className="container wishlist-container">
            <h1>WishList</h1>
            <table className="table table-bordered">
            <tbody>
                {wishlistitemById.map((wish, index) => (
                    <tr
                        key={index}
                        className={"table-light"}
                    >
                        <td className="table-hover wishlistitem-cell"
                        onClick={() => handleItemClick(wish.businessId, wish.id)}>{wish.name}</td>
                        <td className="trash-can-cell" onClick={() => openDeleteModal(wish.businessId)} >
                            <FaTrash/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            <Button variant="primary" onClick={handleModalShow}>
            Add New
            </Button>
            {/* Modal for adding new POI */}
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
                    autoComplete="off"
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
            {/* Modal for confirm deletion */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this POI?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete(businessIdToDelete)}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default WishList;
