/*eslint-disable*/
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MapComponent from '../../components/MapComponent';
import useRealTime from '../../hooks/useRealTime';

const Police = () => {

  const [currentLocation, setCurrentLocation] = useState({
    lat: null, 
    lng: null
  });
  
  const { subscribeToAlerts } = useRealTime();

// Suscribirse a las alertas cuando el componente se monta
useEffect(() => {
    // Función opcional de filtrado
    const filterAlerts = (alert) => alert.type === 'emergency';
    // eslint-disable-next-line 
    const unsubscribe = subscribeToAlerts((alerts) => {
        console.log('Nuevas alertas:', alerts);
    }, filterAlerts);

    // Limpiar suscripción cuando el componente se desmonta
    return () => unsubscribe();
}, []);

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
