import { Button, Grid, TextField, Typography } from '@mui/material';
import Alert from "@mui/material/Alert";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFirebaseLogin from '../../hooks/useFirebaseLogin';
import './style.css';

const Login = () => {

    const { handleLogin, error, setError } = useFirebaseLogin()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    return (
        <Grid container sx={{ height: '500px', my: 5 }}>
            <Grid item xs={12} sm={4} className="hidden sm:block">
            </Grid>
            <Grid item xs={12} sm={4} sx={{ background: 'white', my: '4%' }}>
                {error && (
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                <Typography variant="h4" gutterBottom align='center'>
                    Iniciar Sesión
                </Typography>
                <form>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Correo Electrónico"
                        variant="outlined"
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2, backgroundColor: '#E74C3C' }}
                        onClick={() => { handleLogin(email, password) }}
                    >
                        Iniciar Sesión
                    </Button>
                </form>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ marginTop: 2, backgroundColor: 'white', color: '#A04000 ' }}
                    component={NavLink}
                    to="/register"
                >
                    Crear cuenta
                </Button>
            </Grid>
            <Grid item xs={12} sm={4} className="hidden sm:block">
            </Grid>
        </Grid>

    );
};

export default Login;
