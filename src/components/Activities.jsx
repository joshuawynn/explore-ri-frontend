import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Client from '../services/api';

const Activities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Function to fetch restaurants
        const fetchActivities = async () => {
            try {
                const response = await Client.get('/todos?category=Activity'); 
                setActivities(response.data); 
            } catch (error) {
                console.error('Error fetching restaurants:', error);
                // Handle error appropriately
            }
        };

        fetchActivities();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="activity-grid">
            <h1>Activities</h1>
            {activities.map((activity) => (
                <Link to={`/activities/${activity._id}`} key={activity._id}> 
                    <div className="activity-card">
                        <img src={activity.picture} alt={activity.name} />
                        <h2>{activity.name}</h2>
                        <div>
                            <p>Description:</p>
                            <p>{activity.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Activities;
