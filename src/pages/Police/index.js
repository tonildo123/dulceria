/*eslint-disable*/
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sound from 'react-sound';
import Swal from 'sweetalert2';
import audio from '../../assets/audio.wav';
import MapComponent from '../../components/MapComponent';
import useRealTime from '../../hooks/useRealTime';

const Police = () => {

  const [currentLocation, setCurrentLocation] = useState({
    lat: null, 
    lng: null
  });
  
  const { subscribeToAlerts } = useRealTime();
  const [playSound, setPlaySound] = useState(false);
  const [processedAlerts, setProcessedAlerts] = useState([]);


useEffect(() => {
    
    const filterAlerts = (alert) => alert.type === 'emergency';
    const unsubscribe = subscribeToAlerts((alerts) => {
        console.log('Nuevas alertas:', alerts);
        handleNewAlerts(alerts);
    }, filterAlerts);

    return () => unsubscribe();
}, []);

useEffect(() => {
  
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

const handleNewAlerts = (alerts) => {
  const newAlerts = alerts.filter(
    (alert) => !processedAlerts.some((a) => a.id === alert.id)
  );

  if (newAlerts.length > 0) {
    setProcessedAlerts((prevAlerts) => [...prevAlerts, ...newAlerts]);
    playAlertSound();
  }
};

const playAlertSound = () => {
  setPlaySound(true);
    Swal.fire({
      title: '¡Alerta de Emergencia!',
      html: 'Una nueva alerta ha sido recibida.',
      icon: 'warning',
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonText: 'Cerrar Alerta',
      didClose: () => {
        setPlaySound(false);
      },
      timer: null,
      willOpen: () => {
        const swalContainer = document.querySelector('.swal2-container');
        if (swalContainer) {
          let isRed = true;
          setInterval(() => {
            swalContainer.style.backgroundColor = isRed ? 'red' : 'yellow';
            isRed = !isRed;
          }, 500);
        }
      },
    });
  };


  return (
    <Box>
      {currentLocation.lat && <MapComponent currentLocation={currentLocation}/>}
      {playSound && (
        <Sound
          url={audio}
          playStatus={playSound ? Sound.status.PLAYING : Sound.status.STOPPED} 
          loop={playSound} 
        />
      )}
    </Box>
  )
}

export default Police
