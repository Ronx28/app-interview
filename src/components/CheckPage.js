import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Card, Button, Stack, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// Tema Gelap
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Styling untuk Card (User Info)
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: '500px',
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

// Styling untuk Container
const CheckPageContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  background: 'radial-gradient(circle, rgba(25,25,60,1) 0%, rgba(0,0,0,1) 100%)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const CheckPage = () => {
  const navigate = useNavigate();

  // Data pengguna statis
  const user = {
    idTele: '123456789',
    email: 'user@example.com',
    nama: 'John Doe',
    telepon: '08123456789',
    devisi: 'Marketing',
    subDevisi: 'Digital Marketing',
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CheckPageContainer>
        <StyledCard>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: 'white' }}>
            User Information
          </Typography>
          {user ? (
            <Box id="userInfo">
              <Typography sx={{ color: 'white' }}>
                ID Telegram: <span id="idTele">{user.idTele}</span>
              </Typography>
              <Typography sx={{ color: 'white' }}>
                Email: <span id="email">{user.email}</span>
              </Typography>
              <Typography sx={{ color: 'white' }}>
                Nama: <span id="nama">{user.nama}</span>
              </Typography>
              <Typography sx={{ color: 'white' }}>
                Telepon: <span id="telepon">{user.telepon}</span>
              </Typography>
              <Typography sx={{ color: 'white' }}>
                Devisi: <span id="devisi">{user.devisi || 'N/A'}</span>
              </Typography>
              <Typography sx={{ color: 'white' }}>
                Sub-Devisi: <span id="subDevisi">{user.subDevisi || 'N/A'}</span>
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'white', color: 'black', mt: 2 }}
                onClick={() => navigate(`/interview?idTele=${encodeURIComponent(user.idTele)}`)}
              >
                Confirm
              </Button>
            </Box>
          ) : (
            <Typography sx={{ color: 'white' }}>No user data found</Typography>
          )}
        </StyledCard>
      </CheckPageContainer>
    </ThemeProvider>
  );
};

export default CheckPage;
