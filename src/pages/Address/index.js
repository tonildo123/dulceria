/* eslint-disable */
import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MapComponent from '../../components/MapComponent';
import { uploadFile } from '../../firebase';
import useAddress from '../../hooks/useAddress';


const Address = () => {
  const [mapDimensions, setMapDimensions] = useState({
    width: 0,
    height: 0
  });
  const state = useSelector((state) => state);
  const {user} = state.logger;
  const {Home} = state.homestate;
  const {saveAddress, updateAddress, loading} = useAddress();

  console.log("state", JSON.stringify(state, null, 5));
  const [formData, setFormData] = useState({
    id:Home.id ?? 0,
    idUser:user.id,
    address: Home.address ?? '', 
    number: Home.number ?? null,
    photo : Home.photo ?? null,
    fotoPreview: Home.photo ?? null,
    latitude:Home.latitude ?? null,
    longitude: Home.longitude ?? null,
  });

  //@ts-ignore
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //@ts-ignore
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        foto: file,
        fotoPreview: URL.createObjectURL(file), // Crear URL para vista previa
      });
    }
  };
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('La geolocalización no está soportada por tu navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData({ ...formData, latitude, longitude });
        console.log('Ubicación obtenida:', latitude, longitude);
      },
      (error) => {
        console.error('Error al obtener ubicación:', error);
        alert('No se pudo obtener la ubicación. Por favor, verifica los permisos.');
      }
    );
  };
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let avatarUrl = formData.foto;

    if (formData.foto instanceof File) {
      try {
        avatarUrl = await uploadFile(formData.foto, formData.foto.name, 'avatars');
      } catch (error) {
        console.error('Error uploading file:', error);
        return;
      }
    }

    if(Home.id === 0){
        const body = {
            idUser: formData.idUser,
            address: formData.address,
            number: formData.number,
            photo: avatarUrl,
            latitude: formData.latitude,
            longitude: formData.longitude,
          };
      console.log('guardar');
      saveAddress(body);

    }else {
        const body = {
            id: formData.id,
            idUser: formData.idUser,
            address: formData.address,
            number: formData.number,
            photo: avatarUrl,
            latitude: formData.latitude,
            longitude: formData.longitude,
          };
  
      console.log('actualizar');
      updateAddress(body);
    }

  };

  useEffect(() => {
    const calculateMapSize = () => {
      // Obtener el ancho de la ventana
      const windowWidth = window.innerWidth;
      
      // Calcular dimensiones
      let width, height;
      
      if (windowWidth < 600) { // móvil
        width = windowWidth; // 32px para padding
        height = width * 0.75; // proporción 4:3
      } else { // desktop
        width = Math.min(1000, windowWidth); // máximo 1000 o 60% del ancho
        height = width * 0.6; // proporción más cuadrada para desktop
      }

      setMapDimensions({ width, height });
    };

    // Calcular dimensiones iniciales
    calculateMapSize();

    // Añadir listener para recalcular en resize
    window.addEventListener('resize', calculateMapSize);

    // Cleanup
    return () => window.removeEventListener('resize', calculateMapSize);
  }, []);


  if(loading){
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Grid container sx={{ my: 1 }}>
      <Grid item xs={12} md={3}></Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
          <Typography variant="h5" align="center" gutterBottom alignSelf={'center'}>
            Datos domiciliarios
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Domicilio"
                  name="address"
                  variant="outlined"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Altura"
                  name="number"
                  variant="outlined"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ textTransform: 'none' }}
                >
                  Cargar Foto
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                {formData.fotoPreview && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Vista previa de la foto:
                    </Typography>
                    <img
                      src={formData.fotoPreview}
                      alt="Vista previa"
                      style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleGetLocation}
                  sx={{ textTransform: 'none', mb: 2 }}
                >
                  Obtener Ubicación
                </Button>
                {formData.latitude && (
                  <Box>
                    <MapComponent 
                      ancho={mapDimensions.width}
                      altura={mapDimensions.height}                    
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ textTransform: 'none' }}
                >
                  Guardar Datos
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      ></Grid>
    </Grid>
  );
};



export default Address
