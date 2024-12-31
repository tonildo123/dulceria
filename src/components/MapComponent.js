import { Box, Grid, Paper } from '@mui/material';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React from 'react';

const MapContainer = (props) => {

  const mapStyles = {
    width: '100%',
    height: '100%'
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', p: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: { xs: '70vh', md: '100%' }, 
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Map
              google={props.google}
              zoom={14}
              style={mapStyles}
              initialCenter={props.currentLocation}
            >
              <Marker
                position={props.currentLocation}
                name={'Mi ubicación'}
              />
            </Map>
          </Paper>
        </Grid>        
      </Grid>
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA_VW3tL6VI0n4vtb6LTon6QoPMoXLaPTo  '
})(MapContainer);