import { Link } from 'react-router-dom'

const Activities = ({activities}) => {

    return (
        <div className="activities-grid">
            <h1>Activities</h1>
            {activities.map(activity => (
                <Link to={`${activity._id}`}>
                <div className="activity-card" key={activity.id}>
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
    )
}

export default Activities