import React, { useEffect, useState } from "react";
import {
  getAllWishListItemByAlbumId,
  createWishListItem,
  deleteWishListItemByObjectId,
  getSuggestions,
  getAllGallery,
  getAllWishListItem, 
  getPOIDetailsByBusinessId,
  createUserCategories,
  getUserCategories,
  updateUserCategories
} from "../../api/wishlist/WishListApiService";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FaTrash } from "react-icons/fa";
import CustomNavbar from "../../components/navbar";

function WishList() {

  // All wish list items by Album Id
  const [wishlistitemById, setWishlistitemById] = useState([]);
  // Album ID from URL Params
  let { id } = useParams();

  // Modal Constants
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Object Id to Delete
  const [objectIdToDelete, setObjectIdToDelete] = useState(null);
  // Open/Close Delete Model
  const openDeleteModal = (objectId) => {
      console.log("Object Id",objectId)
      setObjectIdToDelete(objectId);
      setShowDeleteModal(true);
  };


  // Navigation
  const navigate = useNavigate();

  // BusinessID, POINames, AlbumIDs, 
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [selectedPOIName, setSelectedPOIName] = useState("");
  const [allAlbumID, setAllAlbumID] = useState([]);

  // Location, User Input, Suggestions
  const [location, setLocation] = useState("Singapore"); // Default location
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState({});

  // BusinessIDList, Categories, Curated Categories  
  const [businessIdList, setBusinessIdList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [curatedCategories, setCuratedCategories] = useState([]);

  // Fetch wish list items by album ID
  async function getAllAlbumId() {
    try {
      const res = await getAllGallery();
      if (res.status === 200) {
        const allGallery = (res.data);
        // Code to retrieve all albumId and store in allAlbumID constant
        setAllAlbumID(allGallery.map(album => album.id));
        console.log("Album ID List:", allAlbumID);
        fetchWishListItemsByAlbumID(allGallery.map(album => album.id));
      }
    } catch (error) {
      console.error(error);
    }
  }
  // useEffect(() => {
  //   getAllAlbumId();
  // }, []);


  // Fetch Wish List Items
  const fetchWishListItemsByAlbumID = async (albumIDs) => {
    try {
      const allBusinessIds = [];
      for(let i = 0; i < albumIDs.length; i++) {
        const albumId = albumIDs[i];
        console.log("Selected BusinessIDSS:", allBusinessIds);
        const response = await getAllWishListItemByAlbumId(albumId);
        if (response && response.data){
          const businessIds = response.data.map(item => item.businessId.toString());
          allBusinessIds.push(...businessIds);
        }
      }
      console.log("Selected BusinessIDSS:", allBusinessIds);
      setBusinessIdList(allBusinessIds);
      fetchPOIDetailsAndCategories(allBusinessIds);
    } catch (error) {
      console.error('Error fetching wish list items:', error);
    }
  };
  
  // Fetch POI Details and Create Categories
  const fetchPOIDetailsAndCategories = async (businessIdList) => {
    try {
      const categories = [];
      const poiDetailsList = [];
  
      if (businessIdList.length > 0) {
        for (let i = 0; i < businessIdList.length; i++) {
          const response = await getPOIDetailsByBusinessId(businessIdList[i]);
  
          // Check if response.data exists before accessing its properties
          if (response && response.data) {
            const { category } = response.data;
            // Ensure that category is a non-empty string before splitting
            if (category && typeof category === 'string') {
              const categoryArray = category.split(',').map((item) => item.trim().toLowerCase());
              categories.push(...categoryArray);
              poiDetailsList.push(response.data);
            } else {
              console.error('Category is not a valid string:', response);
            }
          } else {
            console.error('Response data is undefined or null:', response);
          }
        }
      }
  
      createCuratedCategories(categories);
    } catch (error) {
      console.error('Error fetching POI details:', error);
    }
  };
  

  // Create Curated Categories
  const createCuratedCategories = async (categories) => {
    let categoryCount = {};
    categories.forEach(category => {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    let curatedCategories = Object.keys(categoryCount).sort((a, b) => categoryCount[b] - categoryCount[a]).slice(0, 4);
    setCuratedCategories(curatedCategories);
    console.log("Curated Categories:", curatedCategories);
    const response = await getUserCategories();
    if (response && response.data){
      console.log("Get User Categories Data: ", getUserCategories().data);
      handleUpdateUserCategories(curatedCategories);
    }else{
      handleAddNewUserCategory(curatedCategories);
    }
  };

  const handleUpdateUserCategories = async (updatedCategories) => {

    if (selectedBusinessId) {
      const payload = {
        email: email,
        categories: updatedCategories 
      };
      try {
        console.log("Attempting to update user categories");
        console.log("Updated Categories:", updatedCategories);
        console.log("Email:", email);
        const res = await updateUserCategories(payload);
        console.log("Updated user categories successfully!", updatedCategories);
        if (res.status === 200) {
           // Handle success response
        }
      } catch (error) {
        console.error(error);
      }
  
    }
  
  }

  const handleAddNewUserCategory = async (userCategories) => {
    if (selectedBusinessId) {
      const payload = {
        email: email,
        userCategories: userCategories,
      };
      try {
        console.log("Attempting to create user categories");
        console.log("User Categories:", userCategories);
        console.log("Email:", email);
        const res = await createUserCategories(payload);
        console.log("Create user categories successfully!")
        if (res.status === 201) {
          // Handle the success response
          getWishListByAlbumId(id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

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
  useEffect(() => {
    getWishListByAlbumId(id.toString());
  }, [id]);


  // Handle when wish list item is clicked
  const handleItemClick = (businessId, wishlistId) => {
    if (businessId) {
      navigate(`/poi/${wishlistId}/${businessId}`);
    }
  };

  // Handle user input for searching POI
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
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle when user selects a POI
  const handleSelect = (businessId) => {
    // Perform actions after selecting the business
    setSelectedBusinessId(businessId);
    setSelectedPOIName(suggestions[businessId][1]);
    console.log("Selected business ID:", selectedBusinessId);
    console.log("Selected POI Name:", selectedPOIName);
  };

  // Handle create modal open/close
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  // Handle when user adds new POI
  const handleAddNewPOI = async () => {
    console.log("BusinessID added:", selectedBusinessId);
    console.log("POI added:", selectedPOIName);
    if (selectedBusinessId) {
      const payload = {
        name: selectedPOIName,
        businessId: selectedBusinessId,
        albumId: id,
        remarks: "",
        visited: "false", // or "false" based on your requirement
      };

      try {
        const res = await createWishListItem(payload);
        if (res.status === 201) {
          // Handle the success response
          getWishListByAlbumId(id);
          getAllAlbumId();

        }
      } catch (error) {
        console.error(error);
      }
    }
  };

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





  // Handle when user deletes wish list item
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleDelete = async (objectId) => {
      console.log("Delete attempted, Object ID is:", objectId);
      try {
          await deleteWishListItemByObjectId(objectId); 
          // window.location.reload()
          getWishListByAlbumId(id);
          getAllAlbumId();
      } catch (error) {
          console.error('Error deleting wish list item:', error);
      }
      setShowDeleteModal(false);
  };

  

  // User Interface
  return (
    <>
      <CustomNavbar />
      <div className="container wishlist-container">
        <h1>WishList</h1>
        <table className="table table-bordered">
          <tbody>
            {wishlistitemById.map((wish, index) => (
              <tr key={index} className={"table-light"}>
                <td
                  className="table-hover wishlistitem-cell"
                  onClick={() => handleItemClick(wish.businessId, wish.id)}
                >
                  {wish.name}
                </td>
                <td
                  className="trash-can-cell"
                  onClick={() => openDeleteModal(wish.id)}
                >
                  <FaTrash />
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
                <Form.Select
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                >
                  <option value="Singapore">Singapore</option>
                  <option value="Johor Bahru">Johor Bahru</option>
                  {/* Add more location options */}
                </Form.Select>
                <br />
                <Form.Control
                  type="text"
                  placeholder="Search for shops..."
                  value={userInput}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                <br />
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
            <Button
              variant="primary"
              onClick={() => handleDelete(objectIdToDelete)}
            >
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default WishList;
