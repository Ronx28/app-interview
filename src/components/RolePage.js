import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, MenuItem, TextField, Typography, Card, Stack, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// Tema Gelap
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Styling untuk Card (Form)
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  width: '100%',
  maxWidth: '500px',
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

// Styling untuk Container
const RolePageContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  background: 'radial-gradient(circle, rgba(25,25,60,1) 0%, rgba(0,0,0,1) 100%)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const DevisiPage = () => {
  const [selectedDevisi, setSelectedDevisi] = useState('');
  const [selectedSubDevisi, setSelectedSubDevisi] = useState('');
  const navigate = useNavigate();

  // Static options for Devisi
  const devisiOptions = [
    { id: '1', namaDevisi: 'Devisi A' },
    { id: '2', namaDevisi: 'Devisi B' },
    { id: '3', namaDevisi: 'Devisi C' },
  ];

  // Static options for Sub-Devisi
  const subDevisiOptions = [
    { id: '1', namaSubDevisi: 'Sub-Devisi A1' },
    { id: '2', namaSubDevisi: 'Sub-Devisi B1' },
    { id: '3', namaSubDevisi: 'Sub-Devisi C1' },
  ];

 // Misalkan idTele adalah salah satu nilai yang ingin kita kirim, bisa dari state atau variabel lain
const handleSubmit = (e) => {
  e.preventDefault();
  if (!selectedDevisi || !selectedSubDevisi) {
    console.error('Missing required fields');
    return;
  }

  // Mengambil idTele dari suatu sumber data (bisa dari state atau variabel lain)
  const idTele = 'some-id-telegram'; // Ganti dengan nilai yang sesuai

  // Navigasi ke CheckPage dengan query parameter idTele
  navigate(`/check?idTele=${encodeURIComponent(idTele)}`);
};


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RolePageContainer>
        <StyledCard>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: 'white' }}>
            Choose Devisi and Sub-Devisi
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              select
              fullWidth
              label="Devisi"
              id="devisi"
              name="devisi"
              value={selectedDevisi}
              onChange={(e) => setSelectedDevisi(e.target.value)}
              variant="outlined"
              sx={{ backgroundColor: '#121212', input: { color: 'white' }, mb: 2 }}
            >
              <MenuItem value="">
                <em>Select Devisi</em>
              </MenuItem>
              {devisiOptions.map(d => (
                <MenuItem key={d.id} value={d.id}>
                  {d.namaDevisi}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Sub-Devisi"
              id="subDevisi"
              name="subDevisi"
              value={selectedSubDevisi}
              onChange={(e) => setSelectedSubDevisi(e.target.value)}
              variant="outlined"
              sx={{ backgroundColor: '#121212', input: { color: 'white' }, mb: 2 }}
            >
              <MenuItem value="">
                <em>Select Sub-Devisi</em>
              </MenuItem>
              {subDevisiOptions.map(sd => (
                <MenuItem key={sd.id} value={sd.id}>
                  {sd.namaSubDevisi}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                mt: 2,
              }}
            >
              Submit
            </Button>
          </Box>
        </StyledCard>
      </RolePageContainer>
    </ThemeProvider>
  );
};

export default DevisiPage;
