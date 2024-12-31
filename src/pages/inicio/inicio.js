import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useAddress from '../../hooks/useAddress';
import useProfile from '../../hooks/useProfile';

const Inicio = () => {

  const {getProfile} = useProfile()
  const {getAddress} = useAddress()
  const user = useSelector(state => state.logger.user);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleButtonClick = () => {
    setAlertVisible(true);

    Swal.fire({
      title: 'Ya enviamos tu alerta',
      icon: 'success',
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
  };

  useEffect(() => {
    getProfile(user.id);
    getAddress(user.id);
     // eslint-disable-next-line 
  }, []);

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