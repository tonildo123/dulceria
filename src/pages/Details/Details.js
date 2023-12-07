/* eslint-disable */
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { card } = location.state;
    const { logged } = useSelector(state => state.logger.user);

    const heightfoto = { xs: '150px', sm: '200px' }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={{ xs: 2, md: 10 }} >
                <Grid item xs={12} md={6}>
                    <Box sx={{ px: '20%', pt: '10%', pb: '20%' }}>
                        <img
                            src={card.urlimagen}
                            alt="image"
                            loading="lazy"
                            width="100%"
                            height={heightfoto}
                        />
                    </Box>

                </Grid>
                <Grid item xs={12} md={6}>
                    <Box pt="10%">
                        <Box sx={{ display: 'flex' }} mb={3}>
                            <Typography variant="body2" gutterBottom component={Link}
                                to="/home"
                                sx={{ cursor: 'pointer', textDecoration: 'none' }}>
                                inicio /
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                onClick={() => navigate(-1)} sx={{ cursor: 'pointer', textDecoration: 'none' }}>
                                Productos /
                            </Typography>
                            <Typography variant="body2" gutterBottom >
                                {card.descripcion.toUpperCase()}
                            </Typography>
                        </Box>
                        <Typography variant="h4" gutterBottom  mb={3}  fontWeight='bold'>
                            {card.descripcion.toUpperCase()}
                        </Typography>
                        <Typography variant="h6" gutterBottom fontWeight='bold'>
                            PRECIO
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ color: 'red' }}  mb={3}>
                            $ {card.precio}
                        </Typography>
                        <Typography variant="h6" gutterBottom fontWeight='bold'>
                            STOCK
                        </Typography>
                        <Typography variant="h6" gutterBottom  mb={3}>
                            {card.stock} unidades
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            endIcon={<ShoppingCart />}
                            sx={{ borderRadius: '18px', mb:4 }}>Agregar al carrito</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Details