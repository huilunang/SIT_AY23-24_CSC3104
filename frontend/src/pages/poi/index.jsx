import { useEffect, useState } from "react";
import { searchPOIByTermAndLocation } from "../../api/wishlist/WishListApiService";

const POI = () => {
    const [term, setTerm] = useState("");
    const [location, setLocation] = useState("");
    const [results, setResults] = useState([]);
  
    const search = async () => {
      try {
        const res = await searchPOIByTermAndLocation(term, location);
  
        if (res.data && res.data.businesses) {
          setResults(res.data.businesses);
        } else {
          console.log("No results found.");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search for Place"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={search}>Search</button>
        <ul>
          {results.map((poi) => (
            <li key={poi.id}>{poi.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default POI;