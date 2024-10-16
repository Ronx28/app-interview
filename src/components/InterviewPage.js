/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
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

const InterviewContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  background: 'radial-gradient(circle, rgba(25,25,60,1) 0%, rgba(0,0,0,1) 100%)',
}));

const InterviewPage = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timer, setTimer] = useState('00:00');
  const [timerInterval, setTimerInterval] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null); 
  const maxRecordingTime = 60; // in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const videoElement = document.getElementById('videoElement');
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
          videoElement.play();
        };
      } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Unable to access media devices.');
      }
    };

    getMediaStream();
  }, []);

  const startRecording = async () => {
    try {
      const stream = document.getElementById('videoElement').srcObject;
      if (!stream) {
        throw new Error("No media stream available.");
      }

      const mimeType = 'video/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      setMediaRecorder(recorder);
      setIsRecording(true);
      setIsVideoReady(false);

      let timeElapsed = 0;
      const interval = setInterval(() => {
        timeElapsed++;
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        setTimer(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
  
        if (timeElapsed >= maxRecordingTime) {
          stopRecording(); 
          clearInterval(interval);
        }
      }, 1000);
  
      setTimerInterval(interval);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedBlob(e.data);
          const videoURL = URL.createObjectURL(e.data);
          const videoElement = document.getElementById('videoElement');
          videoElement.srcObject = null;
          videoElement.src = videoURL;
          videoElement.controls = true;
          setIsVideoReady(true);
        }
      };

      recorder.start(); 
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Error starting the recording.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      setTimer('00:00');
  
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  };

  const reloadRecording = () => {
    if (isRecording) {
      stopRecording();
    }
  
    setTimer('00:00');
    setIsRecording(false);
    setIsVideoReady(false);
  
    const videoElement = document.getElementById('videoElement');
    videoElement.srcObject = null; // Clear the video source
    videoElement.controls = false; // Disable controls for reload
    // eslint-disable-next-line no-undef
    getMediaStream(); // Reload stream
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <InterviewContainer>
        <StyledCard>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: 'white' }}>
            Interview Session
          </Typography>
          <Box sx={{ mt: 2, mb: 2 }}>
            <video id="videoElement" autoPlay muted style={{ width: '100%', height: 'auto', backgroundColor: '#121212' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button variant="contained" onClick={startRecording} disabled={isRecording}>
              Start Recording
            </Button>
            <Button variant="contained" onClick={stopRecording} disabled={!isRecording}>
              Stop Recording
            </Button>
            <Button variant="contained" onClick={reloadRecording} disabled={isRecording}>
              Reload Recording
            </Button>
          </Box>
          <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }} id="timer">
            {timer}
          </Typography>
          <Typography sx={{ color: 'white', mt: 2 }} id="uploadStatus">
            {isVideoReady ? 'Video is ready to be uploaded!' : ''}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate('/end')}
            disabled={!isVideoReady}
          >
            End Interview
          </Button>
        </StyledCard>
      </InterviewContainer>
    </ThemeProvider>
  );
};

export default InterviewPage;
