import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    > 
      <CircularProgress />
    </Box>
  )
};
