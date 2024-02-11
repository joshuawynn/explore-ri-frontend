import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="navbar">

            <Link to="/">
                <h2 className="logo">Explore RI</h2>
            </Link>

            <Link to="/restaurants">
                <h4>Restaurants</h4>
            </Link>

            <Link to="/destinations">
                <h4>Destinations</h4>
            </Link>
            
            <Link to="/activities">
                <h4>Activities</h4>
            </Link>

        </header>
    )
}

export default Header