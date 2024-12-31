import { Box, Button, CircularProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useFirebaseRegister from '../../hooks/useFirebaseRegister';

const CreateUsers = () => {
  const {handleRegisterWithRole} =useFirebaseRegister();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('Submitted Data:', formData);
      await handleRegisterWithRole(formData.email, formData.password, formData.role);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
    
  };

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '300px',
        margin: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h5" textAlign="center">
       Crear usuarios
      </Typography>

      <Select
        value={formData.role}
        name="role"
        onChange={handleChange}
        displayEmpty
        sx={{ width: '100%' }}
      >
        <MenuItem value="" disabled>
          Seleccione un rol
        </MenuItem>
        <MenuItem value="client">Residente</MenuItem>
        <MenuItem value="police">Guardia</MenuItem>
      </Select>

      <TextField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        name="password"
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Crear usuario
      </Button>
    </Box>
  );
};

export default CreateUsers;
