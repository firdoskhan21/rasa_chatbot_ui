import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/user/step-welcome');
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <CheckCircleOutlineIcon style={{ fontSize: '100px', color: '#4caf50' }} />
        <Typography variant="h3" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="h5" gutterBottom>
          We appreciate your participation in our Experiment.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your feedback is valuable and will help us improve our services.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReturnHome}
            size="large"
          >
            Return to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ThankYouPage;
