import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Client from '../services/api';

const Destinations= () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Function to fetch destinations
        const fetchDestinations= async () => {
            try {
                const response = await Client.get('/todos?category=Destination'); 
                setDestinations(response.data); 
            } catch (error) {
                console.error('Error fetching destinations:', error);
                // Handle error appropriately
            }
        };

        fetchDestinations();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="destination-grid">
            <h1>Destination</h1>
            {destinations.map((destination) => (
                <Link to={`/destinations/${destination._id}`} key={destination._id}> 
                    <div className="destination-card">
                        <img src={destination.picture} alt={destination.name} />
                        <h2>{destination.name}</h2>
                        <div>
                            <p>Description:</p>
                            <p>{destination.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Destinations;
