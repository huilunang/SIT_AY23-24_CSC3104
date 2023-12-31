import { useState, useEffect } from "react";
import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPOIDetails,
  updatePOIRemarks,
  updatePOIVisited,
} from "../../api/wishlist/WishListApiService";
import { FaCheck, FaEdit, FaStar, FaStarHalfAlt } from "react-icons/fa";
import CustomNavbar from "../../components/navbar";
import { EventModal } from "../events/event-modal"

const Details = () => {
  const { wishlistId, businessId } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState({});

  const [remarks, setRemarks] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hasWent, setHasWent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async () => {
    try {
      await updatePOIRemarks(wishlistId, businessId, remarks);
      setDetails({ ...details, remarks: remarks });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving remarks: ", error);
    }
  };

  const handleWentChange = async (e) => {
    const isChecked = e.target.checked;
    setHasWent(isChecked);

    try {
      await updatePOIVisited(wishlistId, businessId, isChecked);
      setDetails({ ...details, visited: isChecked });
    } catch (error) {
      console.error("Error updating visited status: ", error);
      // If the update fails, revert the checkbox state
      setHasWent(!isChecked);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPOIDetails(wishlistId, businessId);
        setDetails(res.data);
        setRemarks(res.data.remarks);
        setHasWent(res.data.visited);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchData();
  }, [wishlistId, businessId]);

  const renderStars = (rating) => {
    const starElements = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      starElements.push(<FaStar key={`full_${i}`} style={{ color: "gold" }} />);
    }

    if (hasHalfStar) {
      starElements.push(<FaStarHalfAlt key="half" style={{ color: "gold" }} />);
    }

    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <FaStar key={`empty_${i}`} style={{ color: "grey" }} />
      );
    }

    return starElements;
  };

  const handleBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CustomNavbar />
      <div className="details-container">
        <div className="image-container">
          <img src={details.imageUrl} />
        </div>
        <div className="details-info">
          <div className="details1">
            <h2>{details.name}</h2>
            <div className="rating">
              <p>{details.rating}</p>
              <div className="stars" id="stars">
                {renderStars(details.rating)}
              </div>
            </div>
            <p>{details.category}</p>
          </div>
          <div className="details2">
            <p>Address: {details.address}</p>
          </div>
          <p>Remarks:</p>
          <div className="remarks-section">
            <div className="input-container">
              <textarea
                className={`remarks-input ${isEditing ? "editing" : ""}`}
                type="text"
                value={isEditing ? remarks : details.remarks}
                readOnly={!isEditing}
                onChange={(e) => setRemarks(e.target.value)}
              />
              {isEditing && (
                <FaCheck className="tick-icon" onClick={handleSave} />
              )}
              {!isEditing && (
                <FaEdit
                  className="edit-icon"
                  onClick={() => setIsEditing(true)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="createEvent">
          <button onClick={handleBtnClick} className="btnEvt" >Create Event</button>
        </div>
        <div className="wentOrNot">
          <input
            type="checkbox"
            id="wentCheckbox"
            name="wentCheckbox"
            checked={hasWent}
            onChange={handleWentChange}
            style={{ marginRight: "5px" }}
          />
          <label htmlFor="wentCheckbox" style={{ marginRight: "5px" }}>
            {hasWent ? "Went" : "Yet to go"}
          </label>
        </div>
      </div>
      <EventModal isOpen={isModalOpen} onClose={handleModalClose} businessId={businessId} />
    </>
  );
};

export default Details;
