import { Container } from '@mui/material';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MapComponent = (props) => {

    const state = useSelector((state) => state);
    const {Home} = state.homestate;

  const [lat, setLat] = useState()
  const [long, setLong] = useState()


  useEffect(() => {

    if (Home.latitude && Home.longitude) {
      setLat(Home.latitude)
      setLong(Home.longitude)
    }
  }, [Home])


  return (
    <Container sx={{ width: '100%', height: props.altura ? props.altura : '250px' }}>
      <Map
        google={props.google}
        initialCenter={{ lat: props.latitude, lng: props.longitude}}
        center={{
          lat: lat ? lat : props.latitude,
          lng: long ? long : props.longitude
        }}
        zoom={13}
        style={{ width: props.ancho ? props.altura : '250px', height: props.altura ? props.altura : '250px' }}
      >
       {lat !== null && long !== null && (
        <Marker
          position={{ lat: lat, lng: long}}
        />
      )}     
      </Map>
    </Container>
  );
};


export default GoogleApiWrapper({ apiKey: 'AIzaSyA_VW3tL6VI0n4vtb6LTon6QoPMoXLaPTo'})(MapComponent);