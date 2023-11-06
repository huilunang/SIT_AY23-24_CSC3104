import React, { useState, useEffect } from 'react';
import './styles.css'; 
<<<<<<< HEAD
import { getPOIDetails } from '../../api/wishlist/WishListApiService';
import { FaCheck, FaEdit, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Details = ({ businessId }) => {
  const [details, setDetails] = useState({
    name: '',
    imageURL: '',
    category: '',
    address: '',
    rating: '',
    remarks: ''
  });

  const [editedRemarks, setEditedRemarks] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setEditedRemarks(details.remarks);
    setIsEditing(true);
  };

  const handleSave = () => {
    setDetails({ ...details, remarks: editedRemarks });
    setIsEditing(false);
  };

  const [hasWent, setHasWent] = useState(false);

  const handleWentChange = (e) => {
    setHasWent(e.target.checked);
=======
import { useParams } from 'react-router-dom';
import { getPOIDetails, updatePOIRemarks, updatePOIVisited  } from '../../api/wishlist/WishListApiService';
import { FaCheck, FaEdit, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Details = () => {
  const { wishlistId, businessId } = useParams();

  const [details, setDetails] = useState({});

  const [remarks, setRemarks] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasWent, setHasWent] = useState(false);

  const handleSave = async () => {
    try {
      await updatePOIRemarks(wishlistId, businessId, remarks);
      setDetails({ ...details, remarks: remarks });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving remarks: ', error);
    }
    
  };

  const handleWentChange = async (e) => {
    const isChecked = e.target.checked;
    setHasWent(isChecked);

    try {
      await updatePOIVisited(wishlistId, businessId, isChecked);
      setDetails({ ...details, visited: isChecked });
    } catch (error) {
      console.error('Error updating visited status: ', error);
      // If the update fails, revert the checkbox state
      setHasWent(!isChecked);
    }
>>>>>>> main
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const res = await getPOIDetails();
        setDetails(res.data);
=======
        const res = await getPOIDetails(wishlistId, businessId);
        setDetails(res.data);
        setRemarks(res.data.remarks);
        setHasWent(res.data.visited);
>>>>>>> main
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchData();
<<<<<<< HEAD
  }, [businessId]);
=======
  }, [wishlistId, businessId]);
>>>>>>> main

  const renderStars = (rating) => {
    const starElements = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    for (let i = 0; i < fullStars; i++) {
      starElements.push(<FaStar key={`full_${i}`} style={{ color: 'gold' }} />);
    }
  
    if (hasHalfStar) {
      starElements.push(<FaStarHalfAlt key="half" style={{ color: 'gold' }} />);
    }
  
    for (let i = 0; i < emptyStars; i++) {
      starElements.push(<FaStar key={`empty_${i}`} style={{ color: 'grey' }} />);
    }
  
    return starElements;
  };

  return (
    <div className="details-container" >
      <div className="image-container">
        <img src={details.imageUrl}/>
      </div>
      <div className="details-info">
        <div className="details1">
          <h2>{details.name}</h2>
          <div className="rating">
            <p>{details.rating}</p>
            <div className="stars" id="stars">{renderStars(details.rating)}</div>
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
              className={`remarks-input ${isEditing ? 'editing' : ''}`}
              type="text"
<<<<<<< HEAD
              value={isEditing ? editedRemarks : details.remarks}
              readOnly={!isEditing}
              onChange={(e) => setEditedRemarks(e.target.value)}
=======
              value={isEditing ? remarks : details.remarks}
              readOnly={!isEditing}
              onChange={(e) => setRemarks(e.target.value)}
>>>>>>> main
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
      <div className='wentOrNot'>
        <input
          type="checkbox"
          id="wentCheckbox"
          name="wentCheckbox"
          checked={hasWent}
          onChange={handleWentChange}
          style={{ marginRight: '5px' }}
        />
        <label htmlFor="wentCheckbox" style={{ marginRight: '5px' }}>
          {hasWent ? 'Went' : 'Yet to go'}
        </label>
      </div>
    </div>
  );
};

export default Details;
