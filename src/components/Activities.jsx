import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Client from '../services/api';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Activities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await Client.get('/todos?category=Activity');
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div className="activities-grid">
            <h1>Activities</h1>
            <Row xs={1} md={2} className="g-4">
                {activities.map((activity, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Link to={`/activities/${activity._id}`}>
                                <Card.Img variant="top" src={activity.picture} alt={activity.name} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{activity.name}</Card.Title>
                                <Card.Text>
                                    {activity.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Activities;
