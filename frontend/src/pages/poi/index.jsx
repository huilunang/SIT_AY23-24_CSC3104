import React, { useState } from 'react';

const Index = () => {
    const [location, setLocation] = useState('Singapore'); // Default location
    const [userInput, setUserInput] = useState('');
    const [suggestions, setSuggestions] = useState({});

    const handleInputChange = async (e) => {
        const input = e.target.value;
        setUserInput(input);

        try {
            const response = await fetch(`http://localhost:8080/api/v1/poi/suggestions?location=${location}&userInput=${input}`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSelect = (businessId) => {
        console.log('Selected business ID:', businessId);
        // Perform actions after selecting the business
    };

    return (
        <div>
            <select onChange={(e) => setLocation(e.target.value)}>
                <option value="Singapore">Singapore</option>
                <option value="Johor Bahru">Johor Bahru</option>
                {/* Add more location options */}
            </select>

            <input
                type="text"
                placeholder="Search for shops..."
                value={userInput}
                onChange={handleInputChange}
            />

            <ul>
                {Object.entries(suggestions).map(([businessId, nameAndAddress]) => (
                    <li key={businessId} onClick={() => handleSelect(businessId)}>
                        {nameAndAddress}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;
