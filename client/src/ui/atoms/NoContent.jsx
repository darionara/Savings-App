import { Box, Typography, Container } from '@mui/material';
import NoContentImage from '../../assets/no_content.png';

export const NoContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    > 
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <img src={NoContentImage} alt="Document, coins and calculator graphics"/>
        <Typography color="rgba(51, 51, 51, 0.5)">Brak danych do wyświetlenia</Typography>
      </Container>
    </Box>
  );
};
