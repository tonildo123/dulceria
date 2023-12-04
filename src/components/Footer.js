import React from 'react';
import {
    AppBar,
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
    const textColor = 'white';
    const { logged } = useSelector(state => state.logger.user)

    return (
        <AppBar position="static" sx={{ pt: 2, pb: 8, backgroundColor: '#E74C3C' }}>
            <Container maxWidth="lg">
                <Toolbar>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6" sx={{ color: textColor }}>
                                Tienda
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" sx={{ color: textColor }}>Productos</Typography>
                            <Typography variant="body2" sx={{ color: textColor }}>Como comprar</Typography>
                            <Typography variant="body2" sx={{ color: textColor }}>Descuentos</Typography>
                            <Typography variant="body2" sx={{ color: textColor }}>Mayoreo</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6" sx={{ color: textColor }}>
                                Información
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" sx={{ color: textColor }}>Formas de pago</Typography>
                            <Typography variant="body2" sx={{ color: textColor }}>Costo de envio</Typography>
                            <Typography variant="body2" sx={{ color: textColor }}>Tiempo de envio</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6" sx={{ color: textColor }}>
                                Politicas
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" sx={{ color: textColor }}>Preguntas frecuentes</Typography>
                            <Typography variant="body2" sx={{ color: textColor }}>Terminos y condiciones</Typography>
                            <Typography variant="body2" sx={{ color: textColor }}>Aviso de privacidad</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6" sx={{ color: textColor }}>
                                Ponerse en contacto
                            </Typography>

                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" alignItems="center">
                                <PhoneInTalkIcon sx={{ mr: 1 }} />
                                <Typography
                                    variant="body2"
                                    noWrap
                                    component={NavLink}
                                    to={logged ? "/home" : "/login"}
                                    sx={{
                                        mr: 2,
                                        // display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                >
                                    +52 771 322 7666
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" alignItems="center">
                                <EmailIcon sx={{ mr: 1 }} />
                                <Typography
                                    variant="body2"
                                    noWrap
                                    component={NavLink}
                                    to={logged ? "/home" : "/login"}
                                    sx={{
                                        mr: 2,
                                        // display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Contacto
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" alignItems="center">
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component={NavLink}
                                    to={logged ? "/home" : "/login"}
                                    sx={{
                                        mr: 2,
                                        // display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Siguenos en 
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" alignItems="center">
                                <IconButton sx={{ color: 'white' }} aria-label="Facebook">
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'white' }} aria-label="Twitter">
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'white' }} aria-label="LinkedIn">
                                    <LinkedInIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;
