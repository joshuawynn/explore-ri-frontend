import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Client from '../services/api';

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
        <div className='details-container'>
            {isEditing ? (
                <div className='edit-details-form'>
                    <input type="text" name="name" value={editedDetails.name} onChange={handleEditChange} />
                    <input type="text" name="picuture" value={editedDetails.picture} onChange={handleEditChange} />
                    <textarea name="description" value={editedDetails.description} onChange={handleEditChange}></textarea>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={toggleEdit}>Cancel</button>
                </div>
            ) : (
                <div className='item-details'>
                    <img src={itemDetails.picture} alt={itemDetails.title || itemDetails.name}/>
                    <button onClick={toggleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}

            <div className='reviews-container'>
                <h3>Reviews</h3>
                <br />
                <form onSubmit={handleSubmit}>
                    <label htmlFor='rating'>Rating:</label>
                    <select name="rating" id="rating">
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                    <input type="text" name="summary" id="content" onChange={handleChange} />
                    <button type='submit'>Post</button>
                </form>
                <br />
                <br />
                <div className='reviews'>
                    {itemDetails.reviews.map(review => (
                        <div>
                            <p>{review.summary}</p>
                            <p>rating: {review.rating}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null;
}

export default Details;
