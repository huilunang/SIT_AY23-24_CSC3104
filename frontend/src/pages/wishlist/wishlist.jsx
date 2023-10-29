import React, { useEffect, useState } from "react";
import { getAllWishListItemByAlbumId } from "../../api/wishlist/WishListApiService";
import { useNavigate } from 'react-router-dom';
import './wishlistStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


function WishList() {
    const [wishlistitemById, setWishlistitemById] = useState([]);
    let { id } = useParams();
    console.log("Album ID:", id);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

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
    const handleModalClose = () => setShowModal(false);

    console.log(wishlistitemById);
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
                Add a new item
            </Button>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter item name" />
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
