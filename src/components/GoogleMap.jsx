import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const libraries = ['places']; // Enable the Places library for additional features

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your actual API key

const MapContainer = ({ address }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default center (New York City)
  const [marker, setMarker] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const handleMarkerClick = () => {
    // Handle marker click events here, e.g., display info window, navigate, etc.
  };

  useEffect(() => {
    if (isLoaded) {
      geocodeAddress(address)
        .then((coordinates) => {
          setCenter(coordinates);
          setMarker({ lat: coordinates.lat, lng: coordinates.lng });
        })
        .catch((error) => {
          console.error('Error geocoding address:', error);
        });
      }
    }, [isLoaded, address]);
    
    // Geocoding function (you can use a suitable library or API for this)
    function geocodeAddress(address) {
      // Implement your geocoding logic here, returning latitude and longitude coordinates
      // This is a placeholder example using `fetch` for demonstration purposes:
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=<span class="math-inline">\{address\}&key\=</span>{GOOGLE_API_KEY}`)
        .then((response) => response.json())
        .then((data) => ({ lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }));
    }
    const mapStyles = {
    width: '100%',
    height: '400px',
  };

  if (loadError) return <div>Map Error: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={center}
      onLoad={(map) => setMap(map)}
    >
      {marker && (
        <Marker position={marker.position} onClick={handleMarkerClick} />
      )}
      {marker && (
        <InfoWindow position={marker.position}>
          <div>
            {/* Display content within the info window based on your requirements */}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapContainer;

