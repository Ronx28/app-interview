/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: '450px',
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  background: 'radial-gradient(circle, rgba(25,25,60,1) 0%, rgba(0,0,0,1) 100%)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },  
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const [telegramId, setTelegramId] = useState('');
  const [userId, setUserId] = useState(''); // State for user ID input
  const [password, setPassword] = useState(''); // State for password input

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
      setTelegramId(userId);
      saveUserId(userId);
    } else {
      console.error('Telegram WebApp not available.');
    }
  }, []);

  const saveUserId = async (id) => {
    try {
      await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  };

  const handleStart = () => {
    navigate('/role');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SignInContainer>
        <StyledCard variant="outlined">
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
            Login
          </Typography>
          
          <TextField
            label="User ID"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 4 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleStart}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              Start
            </Button>
          </Box>
        </StyledCard>
      </SignInContainer>
    </ThemeProvider>
  );
};

export default LoginPage;
