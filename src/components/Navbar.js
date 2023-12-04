/* eslint-disable */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Cookie from '@mui/icons-material/Cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { unlogger } from '../state/LoginSlice';
import { profileClean } from '../state/Profileslice';
import { petArrayClean } from '../state/ArrayPetSlice';


const menuDrawerUnlogged = [{ 'label': 'Inicio', 'ruta': '/' }, { 'label': 'Productos', 'ruta': '/products' },
{ 'label': 'Contacto', 'ruta': '/contact' }, { 'label': 'Nosotros', 'ruta': '/nosotros' }];

const menuDrawerLogged = [{ 'label': 'Inicio', 'ruta': '/home' },
{ 'label': 'Mis mascotas', 'ruta': "/pets/create" },
{ 'label': 'Cambiar contraseña', 'ruta': '/profile/password' }];

function ResponsiveAppBar() {

    const dispatch = useDispatch()

    const { logged } = useSelector(state => state.logger.user)

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const Salir = () => {
        dispatch(unlogger())
        dispatch(profileClean())
        dispatch(petArrayClean())
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Cookie sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#E74C3C' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to={logged ? "/home" : "/login"}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        Dulceria
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}

                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none', color: 'black' },
                            }}
                        >
                            {!logged && menuDrawerUnlogged.map((page) => (
                                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                    <Typography component={NavLink}
                                        to={`${page.ruta}`} textAlign="center" style={{ color: 'black' }}>{page.label}</Typography>
                                </MenuItem>
                            ))}
                            {logged && menuDrawerLogged.map((page) => (
                                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                    <Typography
                                        component={NavLink}
                                        to={`${page.ruta}`}
                                        textAlign="center"
                                        style={{ color: 'black' }}>{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Cookie sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to={logged ? "/home" : "/login"}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        Dulceria
                    </Typography>{/**mobile */}
                    {/**desde aqui web */}
                    {logged
                        ? <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                variant="text"
                                component={NavLink}
                                to="/pets/create"
                                sx={{ pt: 1 }}
                            >
                                Dulceria
                            </Button>
                        </Box>
                        : <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                variant="text"
                                component={NavLink}
                                to="/"
                                sx={{ pt: 1 }}
                            >
                                Inicio
                            </Button>
                            <Button
                                variant="text"
                                component={NavLink}
                                to="/products"
                                sx={{ pt: 1 }}
                            >
                                Productos
                            </Button>
                            <Button
                                variant="text"
                                component={NavLink}
                                to="/nosotros"
                                sx={{ pt: 1 }}
                            >
                                Nosotros
                            </Button>
                            <Button
                                variant="text"
                                component={NavLink}
                                to="/contact"
                                sx={{ pt: 1 }}
                            >
                                Contacto
                            </Button>

                        </Box>}
                    <Box>
                        <Button
                            variant="text"
                            component={NavLink}
                            to="/login"
                            sx={{ pt: 1 }}
                        >
                            <AccountCircleIcon sx={{ color: '#E74C3C' }} />
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;