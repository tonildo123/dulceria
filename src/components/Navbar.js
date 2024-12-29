/* eslint-disable */

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookie from '@mui/icons-material/Cookie';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { unlogger } from '../state/LoginSlice';
import { profileClean } from '../state/Profileslice';


const menuDrawerUnlogged = [
    { 'label': 'Inicio', 'ruta': '/' },
    { 'label': 'Iniciar sesion', 'ruta': '/login' },
    { 'label': 'Registrarme', 'ruta': '/register' }];

const menuDrawerLogged = [
    { 'label': 'Inicio', 'ruta': '/' },
    { 'label': 'Mi Perfil', 'ruta': '/home' },
    { 'label': 'Mi casa', 'ruta': '/address' }];

function ResponsiveAppBar() {

    const dispatch = useDispatch()

    const { logged } = useSelector(state => state.logger.user)

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const Salir = () => {
        dispatch(unlogger())
        dispatch(profileClean())
        sessionStorage.clear();
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
                        to={logged ? "/" : "/"}
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
                        Guardia
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
                                    <Typography 
                                        component={NavLink}
                                        to={`${page.ruta}`} 
                                        textAlign="center" 
                                        style={{ color: 'black', textDecoration: 'none' }}
                                    >{page.label}</Typography>
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
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to={logged ? "/" : "/login"}
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
                        Guardia
                    </Typography>{/**mobile */}
                    {/**desde aqui web */}
                    {logged
                        ? <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                                to="/home"
                                sx={{ pt: 1 }}
                            >
                                Mi perfil
                            </Button>
                            <Button
                                variant="text"
                                component={NavLink}
                                to="/address"
                                sx={{ pt: 1 }}
                            >
                                Mi casa
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
                                to="/login"
                                sx={{ pt: 1 }}
                            >
                                Ingresar
                            </Button>
                            <Button
                                variant="text"
                                component={NavLink}
                                to="/register"
                                sx={{ pt: 1 }}
                            >
                                Registrarme
                            </Button>
                            
                        </Box>}
                    <Box>
                        {
                            logged
                                ?
                                <Button
                                    variant="text"
                                    component={NavLink}
                                    onClick={Salir}
                                    sx={{ pt: 1 }}
                                >
                                    <LogoutIcon sx={{ color: '#E74C3C' }} />
                                </Button> :
                                <Button
                                    variant="text"
                                    component={NavLink}
                                    to="/login"
                                    sx={{ pt: 1 }}
                                >
                                    <AccountCircleIcon sx={{ color: '#E74C3C' }} />
                                </Button>
                        }

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;