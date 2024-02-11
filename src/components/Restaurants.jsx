import { Link } from 'react-router-dom'

const Restaurants = ({restaurants}) => {

    return (
        <div className="restaurant-grid">
            <h1>Restaurants</h1>
            {restaurants.map(restaurant => (
                <Link to={`${restaurant._id}`}>
                <div className="restaurant-card" key={restaurant.id}>
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
    )
}

export default Restaurants