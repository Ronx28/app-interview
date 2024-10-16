/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Stack } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Impor gambar dari path dalam folder src
import levelupImage from '../assets/images/levelup.jpg'; 
import { BlinkBlur } from 'react-loading-indicators';


// Tema gelap yang konsisten
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Styling untuk container
const LoadingContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff', // Background warna putih
}));

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulasi waktu loading (misal: 3 detik)
    const timer = setTimeout(() => {
      // Setelah loading, redirect ke halaman login
      navigate('/login');
    }, 6000); 

    return () => clearTimeout(timer); // Bersihkan timer saat komponen di-unmount
  }, [navigate]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LoadingContainer>
        {/* Menggunakan gambar yang diimpor */}
        <img 
          src={levelupImage} 
          alt="Loading" 
          style={{ 
            marginBottom: '20px' // Biarkan gambar tanpa perubahan ukuran
          }} 
        />
        <Box mt={2}>  
        </Box>
        {/* Menambahkan BlinkBlur */}
        <BlinkBlur color="#1E3E62" size="medium" text="loading" textColor="" />
      </LoadingContainer>
    </ThemeProvider>
  );
};

export default Loading;
