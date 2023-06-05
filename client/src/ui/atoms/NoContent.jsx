import { Box, Typography } from '@mui/material';
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
      <img 
        src={NoContentImage} 
        alt=""
        width={202}
        height={202}
        loading='lazy'
        />
      <Typography 
        color='#33333350'
      >
        Brak danych do wyświetlenia
      </Typography>
    </Box>
  );
};
