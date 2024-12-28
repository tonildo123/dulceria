/* eslint-disable */
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAddress from '../../hooks/useAddress';
import useProfile from '../../hooks/useProfile';

const Inicio = () => {

  const {getProfile} = useProfile()
  const {getAddress} = useAddress()
  const state = useSelector(state => state)
  const {user} = state.logger;

  useEffect(() => {
    getProfile(user.id);
    getAddress(user.id);
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="contained" color="primary" sx={{ flexDirection:'column', backgroundColor: 'red', width: '100%', height: '100%' }}>
        <NotificationsActiveIcon sx={{ fontSize: 100 }} />
        <Typography variant="h4" sx={{ color: 'white' }}>Alertar!</Typography>
      </Button>
    </Box>
    )
 
}

export default Inicio