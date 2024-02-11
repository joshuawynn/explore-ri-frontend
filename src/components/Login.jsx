import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after login
import { UserContext } from '../App'; // Import UserContext from App.jsx or where it's defined

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // To display login errors
  const { loginUser } = useContext(UserContext); // Assuming loginUser function is provided in UserContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call loginUser from your context, pass credentials
      await loginUser(credentials);
      navigate('/'); // Redirect to homepage or dashboard on successful login
    } catch (error) {
      // Handle login errors, e.g., wrong credentials, server issues
      setError('Failed to login. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
