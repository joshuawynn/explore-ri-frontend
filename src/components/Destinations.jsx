import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Client from '../services/api';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await Client.get('/todos?category=Destination');
                setDestinations(response.data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <div className="destination-grid">
            <h1>Destinations</h1>
            <Row xs={1} md={2} className="g-4">
                {destinations.map((destination, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Link to={`/destinations/${destination._id}`}>
                                <Card.Img variant="top" src={destination.picture} alt={destination.name} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{destination.name}</Card.Title>
                                <Card.Text>
                                    {destination.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Destinations;
