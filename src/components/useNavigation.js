import { useState } from 'react';

const useNavigation = () => {
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  const initializeServices = (google, map) => {
    if (!directionsService) {
      setDirectionsService(new google.maps.DirectionsService());
    }
    if (!directionsRenderer) {
      const renderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#FF0000',
          strokeWeight: 4
        }
      });
      setDirectionsRenderer(renderer);
    }
  };

  const navigateToLocation = (origin, destination) => {
    if (!directionsService || !directionsRenderer) {
      console.error('Servicios de dirección no inicializados');
      return;
    }

    const request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Error al calcular la ruta:', status);
      }
    });
  };

  const clearRoute = () => {
    if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
    }
  };

  // Función para abrir en Google Maps
  const openInGoogleMaps = (destination) => {
    if (!destination?.lat || !destination?.lng) return;
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`;
    window.open(url, '_blank');
  };

  return {
    initializeServices,
    navigateToLocation,
    clearRoute,
    openInGoogleMaps
  };
};

export default useNavigation;   