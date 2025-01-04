import { Box, Grid, Paper } from '@mui/material';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useEffect, useRef, useState } from 'react';
import ModalDescription from './ModalDescription';
import useNavigation from './useNavigation';

const MapContainer = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const mapRef = useRef(null);
  const { initializeServices, navigateToLocation, clearRoute } = useNavigation();

  const mapStyles = {
    width: '100%',
    height: '100%'
  };

  useEffect(() => {
    if (mapRef.current && props.google) {
      initializeServices(props.google, mapRef.current.map);
    }// eslint-disable-next-line
  }, [mapRef.current]);

  const handleClick = (item) => {
    console.log('click', JSON.stringify(item, null, 5));
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
    clearRoute(); // Limpiar la ruta cuando se cierra el modal
  };

  const handleShowRoute = (destinationLocation) => {
    if (props.currentLocation && destinationLocation) {
      const origin = {
        lat: props.currentLocation.lat,
        lng: props.currentLocation.lng
      };
      
      const destination = {
        lat: destinationLocation.lat,
        lng: destinationLocation.lng
      };

      navigateToLocation(origin, destination);
    }
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
              ref={mapRef}
            >
              <Marker
                position={props.currentLocation}
                title={'Mi ubicación'}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                }}
              />

              {props.processedAlerts.map((alert, index) => (
                <Marker
                  key={index}
                  position={alert?.location}
                  title={`${alert?.data?.profile?.name}${' '}${alert?.data?.profile?.lastName}`}
                  onClick={() => handleClick(alert)}
                />
              ))}
            </Map>
          </Paper>
        </Grid>
      </Grid>
      {isModalVisible && selectedItem && (
        <ModalDescription
          item={selectedItem}
          onClose={handleCloseModal}
          isVisible={isModalVisible}
          onShowRoute={() => handleShowRoute(selectedItem.location)}
          google={props.google}
        />
      )}
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA_VW3tL6VI0n4vtb6LTon6QoPMoXLaPTo'
})(MapContainer);