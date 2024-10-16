import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Box, Button, Typography, Card, Stack, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: '600px',
  margin: 'auto',
}));

const EndingContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  background: 'radial-gradient(circle, rgba(25,25,60,1) 0%, rgba(0,0,0,1) 100%)',
}));

const EndInterviewPage = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <EndingContainer>
        <StyledCard>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: 'white' }}>
            Thank you for completing the interview!
          </Typography>
          <Typography component="p" variant="body1" sx={{ textAlign: 'center', color: 'white', mt: 2 }}>
            We appreciate your time and effort. Our team will review your submission.
          </Typography>
        </StyledCard>
      </EndingContainer>
    </ThemeProvider>
  );
};

export default EndInterviewPage;
