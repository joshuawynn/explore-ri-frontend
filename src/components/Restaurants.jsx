import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Client from '../services/api';
// Import Bootstrap components
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// Import MapContainer if you're going to use it
// import MapContainer from './GoogleMap';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await Client.get('/todos?category=Restaurant'); // Adjust the URL as needed
                setRestaurants(response.data); // Assuming the API returns the list of restaurants directly
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="restaurant-grid">
            <h1>Restaurants</h1>
            <Row xs={1} md={2} className="g-4">
                {restaurants.map((restaurant, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Link to={`/restaurants/${restaurant._id}`}>
                                <Card.Img variant="top" src={restaurant.picture} alt={restaurant.name} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{restaurant.name}</Card.Title>
                                <Card.Text>
                                    {restaurant.description}
                                </Card.Text>
                                {/* Uncomment and adjust the MapContainer if you need to display maps */}
                                {/* {restaurant.address && (
                                    <MapContainer address={restaurant.address} />
                                )} */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Restaurants;
