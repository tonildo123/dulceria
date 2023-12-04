import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Container } from '@mui/material';
import Swal from 'sweetalert2';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const contactCollection = collection(db, 'Contact');
            await addDoc(contactCollection, formData);

            Swal.fire({
                title: 'Mensaje enviado!',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate('/');
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Ocurrió un error!',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'OK',
            });
        }

    };

    return (
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom sx={{ my: 2 }}>
                    Contáctanos
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre"
                                variant="outlined"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="telefono"
                                label="Número de teléfono"
                                variant="outlined"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="mensaje"
                                label="Mensaje"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={formData.mensaje}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '16px' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default Contacto;
