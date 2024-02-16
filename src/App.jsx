import './App.css';
import Header from './components/Header';
import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Restaurants from './components/Restaurants';
import Destinations from './components/Destinations';
import Activities from './components/Activities';
import Client from './services/api';
import Details from './components/Details';
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Feed from './pages/Feed'
import AddTodoForm from './components/AddTodoForm';
import { CheckSession } from './services/Auth';
import ForgotPassword from './pages/ForgotPassword';






const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = localStorage.getItem("user") ? localStorage.getItem("user") : ""
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])


  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()


  }


  return (
    <div className="text-3xl font-bold underline">
      <Header
        user={user}
        handleLogOut={handleLogOut}
      />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/:type/:id" element={<Details user={user} />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feed" element={<Feed user={user} />} />
            <Route path="/addTodoForm" element={<AddTodoForm user={user} />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </main>
        <footer>

        </footer>
      </div>
  )
}

export default App;
