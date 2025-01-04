import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingComponent from '../../components/LoadingComponent';
import { uploadFile } from '../../firebase';
import useProfile from '../../hooks/useProfile';

const Home = () => {

  const state = useSelector((state) => state);
  const {user} = state.logger;
  const {profile} = state.profileuser;
  const {saveProfile, updateProfile, loading} = useProfile();


  console.log("state", JSON.stringify(state, null, 5));
  const [formData, setFormData] = useState({
    id: profile.id ?? '',
    idUser: user.id ?? '',
    apellido: profile.lastName ?? '',
    nombre: profile.name ?? '',
    telefono: profile.numberPhone ?? '',
    foto: profile.avatar ?? null,
    fotoPreview: profile.avatar ?? null,
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

  //@ts-ignore
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

    if(profile.id === 0){
      const body = {
        idUser: user.id,
        name: formData.nombre,
        lastName: formData.apellido,
        numberPhone: formData.telefono,
        avatar: avatarUrl,
      }
      console.log('guardar');
      saveProfile(body);

    }else {
      const body = {
        id: profile.id,
        idUser: user.id,
        name: formData.nombre,
        lastName: formData.apellido,
        numberPhone: formData.telefono,
        avatar: avatarUrl,
      }
  
      console.log('actualizar');
      updateProfile(body);
    }

  };


  if(loading){
    <LoadingComponent />
  }

  return (
    <Grid container sx={{ my: 1 }}>
      <Grid item xs={12} md={3}></Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
          <Typography variant="h5" align="center" gutterBottom alignSelf={'center'}>
            Datos Personales
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  variant="outlined"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  variant="outlined"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  variant="outlined"
                  value={formData.telefono}
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

export default Home;
