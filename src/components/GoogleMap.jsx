import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import Geocode from "react-geocode";

const libraries = ['places']; // Enable the Places library for additional features
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your actual API key

// Geocode.setKey(GOOGLE_API_KEY);

const mapStyles = {
  width: '100%',
  height: '400px',
};

const MapContainer = ({ address }) => {
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default center (New York City)
  const [markerVisible, setMarkerVisible] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  useEffect(() => {
    // Set user's current location as map center if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }

    // Geocode address to set map center and marker
    if (isLoaded && address) {
      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          setCenter({ lat, lng });
          setMarkerVisible(true); // Show marker after successfully geocoding address
        },
        error => {
          console.error('Error geocoding address:', error);
        }
      );
    }
  }, [isLoaded, address]);

  const handleMapClick = () => {
    // Toggle marker visibility on map click
    setMarkerVisible(!markerVisible);
  };

  if (loadError) return <div>Map Error: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={15}
      center={center}
      onClick={handleMapClick}
    >
      {markerVisible && (
        <Marker position={center} />
      )}
    </GoogleMap>
  );
};

export default MapContainer;
