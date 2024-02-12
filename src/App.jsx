import './App.css';
import Header from './components/Header';
import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Restaurants from './components/Restaurants';
import Destinations from './components/Destinations';
import Activities from './components/Activities';
import Login from './components/Login'; // Assuming you have a Login component
import Client from './services/api';
import Details from './components/Details';

// Create a User Context
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  // Dummy function for user authentication - replace with your actual login logic
  const loginUser = async () => {
    try {
      // Replace this with your actual login logic
      const userData = await Client.get('/login');
      setUser(userData.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    // Check if user is logged in on app start, update 'user' state accordingly
    // Replace this with your actual check login logic
    const checkLoginStatus = async () => {
      try {
        const userData = await Client.get('/current-user');
        setUser(userData.data);
      } catch (error) {
        console.error('Failed to check login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser }}>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:type/:id" element={<Details />} />
          </Routes>
        </main>
        <footer>
          {/* Footer content */}
        </footer>
      </div>
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser() {
  return useContext(UserContext);
}

export default App;
