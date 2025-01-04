import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useAddress from '../../hooks/useAddress';
import useProfile from '../../hooks/useProfile';
import useRealTime from '../../hooks/useRealTime';

const Inicio = () => {

  const {getProfile} = useProfile()
  const {getAddress} = useAddress()
  const user = useSelector(state => state.logger.user);
  const profile = useSelector(state => state.profileuser.profile);
  const Home = useSelector(state => state.homestate.Home);
  const [alertVisible, setAlertVisible] = useState(false);
  const { writeDataBaseAlert } = useRealTime();
  const [currentLocation, setCurrentLocation] = useState({
    lat: null, 
    lng: null
  });
  


  useEffect(() => {
    getProfile(user.id);
    getAddress(user.id);
     // eslint-disable-next-line 
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
  const handleButtonClick = async () => {
    try {
        const newAlert = {
            type: 'emergency',
            message: 'Nueva emergencia',
            location: {
                lat: currentLocation.lat,
                lng: currentLocation.lng
            },
            data: {
                home: Home,
                profile: profile
            }
        };

        const alertId = await writeDataBaseAlert(newAlert);
        console.log('Alerta creada con ID:', alertId);
        setAlertVisible(true);

    Swal.fire({
      title: 'Ya enviamos tu alerta',
      imageUrl: 'https://media.giphy.com/media/hqmfJ2HdlyU6jEJBcH/giphy.gif',
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: false, 
      showConfirmButton: false,
      timer: 60000, 
      allowOutsideClick: false, 
      allowEscapeKey: false,
      didClose: () => {
        setAlertVisible(false);
        console.log('Alerta cerrada');
      },
    });
    } catch (error) {
        console.error('Error al crear alerta:', error);
    }
};

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button 
        variant="contained" 
        onClick={handleButtonClick}
        disabled={alertVisible}
        color="primary" 
        sx={{ flexDirection:'column', backgroundColor: 'red', width: '100%', height: '100%' }}>
        <NotificationsActiveIcon sx={{ fontSize: 100 }} />
        <Typography variant="h4" sx={{ color: 'white' }}>Alertar!</Typography>
      </Button>
    </Box>
    )
 
}

export default Inicio