import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios if you haven't

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // Function to fetch restaurants
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('/todos?category=Restaurant'); // Adjust the URL as needed
                setRestaurants(response.data); // Assuming the API returns the list of restaurants directly
            } catch (error) {
                console.error('Error fetching restaurants:', error);
                // Handle error appropriately
            }
        };

        fetchRestaurants();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="restaurant-grid">
            <h1>Restaurants</h1>
            {restaurants.map((restaurant) => (
                <Link to={`/restaurants/${restaurant._id}`} key={restaurant._id}> {/* Ensure unique key and correct URL */}
                    <div className="restaurant-card">
                        <img src={restaurant.picture} alt={restaurant.name} />
                        <h2>{restaurant.name}</h2>
                        <div>
                            <p>Description:</p>
                            <p>{restaurant.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Restaurants;
