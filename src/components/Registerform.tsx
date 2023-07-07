import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, CssBaseline, Avatar, Box, Grid, Container, Snackbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, AlertColor } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Registerform: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('success');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();


    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('Password should be minimum 6 characters with at least one special character');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate email, password, and confirm password
        validateEmail(email);
        validatePassword(password);
        validateConfirmPassword(confirmPassword);

        // Proceed with form submission if there are no validation errors
        if (emailError === '' && passwordError === '' && confirmPasswordError === '') {
            // Create a payload object with the registration data
            const payload = {
                name,
                email,
                password,
            };

            try {
                // Make an HTTP POST request to the server-side API endpoint
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                // Handle the response
                if (response.ok) {
                    // Registration successful, extract the token from the response
                    const { token, username } = await response.json();

                    // Save the token to local storage or a cookie
                    localStorage.setItem('token', token);

                    setSnackbarMessage(`${username} successfully registered`); // Use the username in the success message
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);

                    console.log('Registration successful');
                    // Set a timer before navigating to the next page
                    setTimeout(() => {
                        // Navigate to the signin page
                        navigate('/signin');
                    }, 3000); // Adjust the delay as needed
                } else if (response.status === 409) {
                    // User already exists, extract the error message from the response
                    const { error } = await response.json();

                    setSnackbarMessage(error || 'Email already exists');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);

                    console.error('User already exists');
                } else {
                    // Registration failed, handle the error
                    setSnackbarMessage('Registration failed');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);

                    console.error('Registration failed');
                }
            } catch (error) {
                console.error('Error:', error);

                // Registration failed, handle the error
                setSnackbarMessage('Registration failed');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '25px',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            validateConfirmPassword(e.target.value);
                        }}
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/signin">Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', fontWeight: 'bold' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Registerform;
