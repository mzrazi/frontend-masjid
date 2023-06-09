import * as React from 'react';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import CustomAlertBox from "components/customAlertBox";

import jwt_decode from "jwt-decode"
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Login({ setIsAuthenticated, isAuthenticated }){
 
  const Navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/authlogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
    
      if (data.status) {
        const token = data.token;
        const decodedToken = jwt_decode(token);
        const userId=data.id
        
        if (decodedToken && decodedToken.exp > Date.now() / 1000) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("expirationTime",decodedToken.exp)
          setIsAuthenticated(true);
        
          Navigate("/dashboard");
        } else {
          setAlert({ message: "login failed.invalid token", type: "error" });
        }
      } else {
        setAlert({ message: data.message, type: "error" });
      }
    } catch (error) {
      console.error(error);
      setAlert({ message: "login failed.invalid username or password", type: "error" });
      
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           ADMIN LOGIN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {alert && ( // Render the alert message if it exists
          <CustomAlertBox
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
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
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>
  );
}