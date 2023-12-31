import { Box, Typography, Container } from '@mui/material';
import ErrorImage from '../../assets/unknown_error.png';

export const Error = ({ error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {
        error?.message?.includes('Network Error') ? (
          <Typography>Uruchom Server!</Typography>
        ) : 
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <img 
            src={ErrorImage} 
            alt=""
            style={{
              height: '100%',
              weight: '100%',
              maxHeight: '248px',
              maxWidth: '248px',
            }}
          />
          <Typography color="rgba(51, 51, 51, 0.5)">
            Wystąpił nieoczekiwany błąd
          </Typography>
        </Container>
      }
    </Box>
  );
};
