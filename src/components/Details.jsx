import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Client from '../services/api';

const Details = ({user}) => { // type could be 'restaurants', 'activities', or 'destinations'
    const { type, id  } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const [review, setReview] = useState({
        rating: '5',
        summary: ''
    });
console.log(review)
    const fetchDetails = async () => {
        try {
            let response = await Client.get(`/todos/${id}/?category=${type}`);
            setItemDetails(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(`Error fetching ${type} details:`, error);
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
        console.log(user)
    }, [id, type]);



    return itemDetails ? (
        <div className='details-container'>
            {/* Dynamic content rendering based on the type */}
            <div className='item-details'>
                <img src={itemDetails.picture} alt={itemDetails.title || itemDetails.name}/>
                <div className='item-data'>
                    {/* Conditional rendering based on type */}
                    {type === 'activities' && (
                        <div>
                            {/* Specific activity details */}
                        </div>
                    )}
                    {type === 'restaurants' && (
                        <div>
                            {/* Specific restaurant details */}
                        </div>
                    )}
                     {type === 'destinations' && (
                        <div>
                            {/* Specific destination details */}
                        </div>
                    )}
                    {/* Common details and reviews */}
                </div>
                <h2>{itemDetails.title || itemDetails.name}</h2>
                <p>{itemDetails.description}</p>
            </div>

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
