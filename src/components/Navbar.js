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

// Define menus for different roles
const menusByRole = {
    unlogged: [
        { label: 'Iniciar sesion', ruta: '/' },
        { label: 'Registrarme', ruta: '/register' }
    ],
    client: [
        { label: 'Inicio', ruta: '/' },
        { label: 'Mi Perfil', ruta: '/home' },
        { label: 'Mi casa', ruta: '/address' }
    ],
    police: [
        { label: 'Inicio', ruta: '/police' }
    ],
    admin: [
        { label: 'Inicio', ruta: '/' },
        { label: 'Mi Perfil', ruta: '/home' },
        { label: 'Mi casa', ruta: '/address' },
        { label: 'Guardias', ruta: '/police' },
        { label: 'Alerta', ruta: '/alert' }
    ]
};

function ResponsiveAppBar() {
    const dispatch = useDispatch();
    const { logged, role } = useSelector(state => state.logger.user);
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    // Get current menu based on login status and role
    const getCurrentMenu = () => {
        if (!logged) return menusByRole.unlogged;
        return menusByRole[role] || menusByRole.client;
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const Salir = () => {
        dispatch(unlogger());
        dispatch(profileClean());
        sessionStorage.clear();
    };

    const currentMenu = getCurrentMenu();

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo for desktop */}
                    <Cookie sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#E74C3C' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
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

                    {/* Mobile menu */}
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
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {currentMenu.map((page) => (
                                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                    <Typography
                                        component={NavLink}
                                        to={page.ruta}
                                        textAlign="center"
                                        style={{ color: 'black', textDecoration: 'none' }}
                                    >
                                        {page.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo for mobile */}
                    <Cookie sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#E74C3C' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
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
                    </Typography>

                    {/* Desktop menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {currentMenu.map((page) => (
                            <Button
                                key={page.label}
                                variant="text"
                                component={NavLink}
                                to={page.ruta}
                                sx={{ 
                                    pt: 1,
                                    color: 'black',
                                    '&.active': {
                                        color: '#E74C3C'
                                    }
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Login/Logout button */}
                    <Box>
                        {logged ? (
                            <Button
                                variant="text"
                                onClick={Salir}
                                sx={{ pt: 1 }}
                            >
                                <LogoutIcon sx={{ color: '#E74C3C' }} />
                            </Button>
                        ) : (
                            <Button
                                variant="text"
                                component={NavLink}
                                to="/"
                                sx={{ pt: 1 }}
                            >
                                <AccountCircleIcon sx={{ color: '#E74C3C' }} />
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;