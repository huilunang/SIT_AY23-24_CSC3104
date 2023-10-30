import React, { useState, useEffect } from 'react';
import './styles.css'; 
import { getPOIDetails } from '../../api/wishlist/WishListApiService';

const Details = ({ businessId }) => {
  const [details, setDetails] = useState({
    name: '',
    imageURL: '',
    category: '',
    address: '',
    rating: ''
  });

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

  return (
    <div className="details-container">
      <div className="image-container">
        <img src={details.imageUrl} alt="Shop" />
      </div>
      <div className="details-info">
        <h2>{details.name}</h2>
        <p><strong>Category:</strong> {details.category}</p>
        <p><strong>Address:</strong> {details.address}</p>
        <p><strong>Rating:</strong> {details.rating}</p>
        <p><strong>Remarks:</strong> {details.remarks}</p>
      </div>
    </div>
  );
};

export default Details;
