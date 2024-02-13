import { Link } from 'react-router-dom';

const Header = ({ user, handleLogOut }) => {
    let userOptions
    if (user) {
      userOptions = (
        <nav>
          <h3>Welcome {user.email}!</h3>
          <Link to="/feed">Feed</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
        </nav>
      )
    }
  
    const publicOptions = (
      <nav className="navbar">
        <Link to="/register"><h4>Register</h4></Link>
        <Link to="/signin"><h4> Sign In</h4></Link>
      </nav>
    )

    return (
        <header className="navbar">
            <Link to="/"><h2 className="logo">Explore RI</h2></Link>
            <Link to="/restaurants"><h4>Restaurants</h4></Link>
            <Link to="/destinations"><h4>Destinations</h4></Link>
            <Link to="/activities"><h4>Activities</h4></Link>
            <Link to="/addTodoForm"><h4>Add Todo</h4></Link>

            {user ? userOptions : publicOptions}

            {/* {user ? (
                <h4 onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</h4> // Make "Logout" clickable
            ) : (
                <Link to="/login"><h4>Login</h4></Link>
            )} */}
        </header>
    );
};

export default Header;
