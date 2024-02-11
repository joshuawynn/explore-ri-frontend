import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App'; // Adjust the import path as needed

const Header = () => {
    const { user, loginUser } = useContext(UserContext); // Assume loginUser can also handle logout

    const handleLogout = () => {
        // Call a function to handle logout. This might set the user state to null.
        // You might need to adjust loginUser or create a separate function for logout.
        loginUser(null);
    };

    return (
        <header className="navbar">
            <Link to="/"><h2 className="logo">Explore RI</h2></Link>
            <Link to="/restaurants"><h4>Restaurants</h4></Link>
            <Link to="/destinations"><h4>Destinations</h4></Link>
            <Link to="/activities"><h4>Activities</h4></Link>

            {user ? (
                <h4 onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</h4> // Make "Logout" clickable
            ) : (
                <Link to="/login"><h4>Login</h4></Link>
            )}
        </header>
    );
};

export default Header;
