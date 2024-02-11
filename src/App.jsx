import './App.css'
import Header from './components/Header'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Restaurants from './components/Restaurants.jsx'
import Destinations from './components/Destinations.jsx'
import Activities from './components/Activity.jsx'
import Client from './services/api.js'

function App() {

  const [restaurants, setRestaurant] = useState([])
  const [destinations, setDestination] = useState([])
  const [activities, setActivity] = useState([])

  const getRestaurant = async () => {
    let res = await Client.get('/todo/restaurants')
    setRestaurant(res.data)
    console.log(res.data)
  }

  const getDestination = async () => {
    let res = await Client.get('/destinations')
    setDestination(res.data)
    console.log(res.data)
  }

  const getActivity = async () => {
    let res = await Client.get('/activities')
    setActivity(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    getRestaurant();
    getDestination();
    getActivity();
  }, [])


  return (
    <div>
      < Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/restaurants' element={<Restaurants restaurants={restaurants}/>} />
          <Route path='/destinations' element={<Destinations destinations={destinations}/>} />
          <Route path='/activities' element={<Activities activities={activities}/>} />
        </Routes>
      </main>
      <footer>
        
      </footer>
    </div>
  )
}

export default App
