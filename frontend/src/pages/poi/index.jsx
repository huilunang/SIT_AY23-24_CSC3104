import React, { useState, useEffect } from 'react';
import './styles.css'; 
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
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const res = await getPOIDetails();
        setDetails(res.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchData();
  }, [businessId]);

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
              value={isEditing ? editedRemarks : details.remarks}
              readOnly={!isEditing}
              onChange={(e) => setEditedRemarks(e.target.value)}
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
