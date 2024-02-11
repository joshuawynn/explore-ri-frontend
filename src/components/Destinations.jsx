import { Link } from 'react-router-dom'

const Destinations = ({destinations}) => {

    return (
        <div className="destination-grid">
            <h1>Destinations</h1>
            {destinations.map(destination => (
                <Link to={`${destination._id}`}>
                <div className="destination-card" key={destination.id}>
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
    )
}

export default Destinations