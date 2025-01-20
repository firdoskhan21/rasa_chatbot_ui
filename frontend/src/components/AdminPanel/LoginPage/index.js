import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {  ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin(true, true); // Authenticated and isAdmin
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    } else if (username === "user" && password === "user") {
      onLogin(true, false); // Authenticated but not admin
      navigate("/user/welcome"); // Redirect to user welcome page
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={6} style={{ padding: '20px', marginTop: '50px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
