// WishList.js
import React, { useEffect, useState } from "react";
// import "./wishlistStyle.css"; // Import the CSS file with styles
import { getAllWishListItem } from "../../api/wishlist/WishListApiService";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function WishList() {
    const [wishlist, setWishList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    
    async function getWishList(){
        try {
            const res = await getAllWishListItem();
            if (res.status === 200){
                setWishList(res.data);
            }
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getWishList();
    }, []);

    const handleItemClick = (objectId) => {
        navigate(`/wishlist/${objectId}`);
    };

    return (
        <div className="wishlist-container">
            <h1>Hello</h1>
            <div className="container">
                {wishlist.map((wish, index) => (
                    <div
                        key={index}
                        className="wishlist-item"
                        onClick={() => handleItemClick(wish.name+wish.objectId)}
                    >
                        {wish.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WishList;
