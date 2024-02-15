import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Client from '../services/api';
import { Card, Button, Form, Col, Row, Container } from 'react-bootstrap';
import MapContainer from './GoogleMap'; // Import the MapContainer component

const Details = ({ user }) => {
    const { type, id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState({});
    const navigate = useNavigate();
    const [review, setReview] = useState({
        rating: '5',
        summary: ''
    });

    const fetchDetails = async () => {
        try {
            let response = await Client.get(`/todos/${id}/?category=${type}`);
            setItemDetails(response.data);
            setEditedDetails(response.data); // Initialize editable details
        } catch (error) {
            console.error(`Error fetching ${type} details:`, error);
        }
    };

    const handleEditChange = (e) => {
        setEditedDetails({ ...editedDetails, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = async () => {
        try {
            await Client.put(`/todos/${id}`, editedDetails);
            setIsEditing(false);
            fetchDetails(); // Refresh the details to show updated data
        } catch (error) {
            console.error("Error updating Todo:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await Client.delete(`/todos/${id}`);
            navigate('/'); // Redirect to home or list page after deletion
        } catch (error) {
            console.error("Error deleting Todo:", error);
        }
    };

    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const addReview = async () => {
        try {
            await Client.post(`/reviews/user/${user.id}/todo/${id}`, review)
            .then(() => {
                fetchDetails();
            });
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        addReview();
    };

    useEffect(() => {
        fetchDetails();
    }, [id, type]);

    return itemDetails ? (
        <Container className='details-container mt-4'>
            {isEditing ? (
                <Form onSubmit={handleUpdate}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" name="name" value={editedDetails.name} onChange={handleEditChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Picture URL</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" name="picture" value={editedDetails.picture} onChange={handleEditChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Description</Form.Label>
                        <Col sm="10">
                            <Form.Control as="textarea" name="description" value={editedDetails.description} onChange={handleEditChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Address</Form.Label>
                        <Col sm="10">
                            <Form.Control as="textarea" name="address" value={editedDetails.address} onChange={handleEditChange} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Save</Button>
                    <Button variant="secondary" onClick={toggleEdit} className="ms-2">Cancel</Button>
                </Form>
            ) : (
                <Card>
                    <Card.Img variant="top" src={itemDetails.picture} alt={itemDetails.title || itemDetails.name} />
                    <Card.Body>
                        <Card.Title>{itemDetails.name}</Card.Title>
                        <Card.Text>{itemDetails.description}</Card.Text>
                        <Button variant="warning" onClick={toggleEdit}>Edit</Button>
                        <Button variant="danger" onClick={handleDelete} className="ms-2">Delete</Button>
                    </Card.Body>
                </Card>
            )}

            <div className='reviews-container mt-4'>
                <h3>Reviews</h3>
                <Form onSubmit={handleSubmit} className="mt-3">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Rating</Form.Label>
                        <Col sm="10">
                            <Form.Select name="rating" defaultValue="5" onChange={handleChange}>
                                <option value="5">5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Summary</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" name="summary" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Post Review</Button>
                </Form>

                {itemDetails.reviews && itemDetails.reviews.map((review, index) => (
                    <Card key={index} className="mt-3">
                        <Card.Body>
                            <Card.Text>{review.summary}</Card.Text>
                            <Card.Text>Rating: {review.rating}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            {itemDetails.address && (
                <MapContainer address={itemDetails.address} />
            )}
        </Container>
    ) : null;
}

export default Details;
