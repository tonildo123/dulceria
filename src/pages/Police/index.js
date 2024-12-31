import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MapComponent from '../../components/MapComponent';

const Police = () => {

  const [currentLocation, setCurrentLocation] = useState({
    lat: null, 
    lng: null
  });

  useEffect(() => {
    // Intentar obtener la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({
            lat: latitude,
            lng: longitude
          });
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.error('El navegador no soporta Geolocalización');
    }
  }, []);
  return (
    <Box>
      {currentLocation.lat && <MapComponent currentLocation={currentLocation}/>}
    </Box>
  )
}

export default Police
