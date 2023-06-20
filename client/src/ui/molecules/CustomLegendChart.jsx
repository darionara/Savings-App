import React from 'react';
import { Typography, Box } from '@mui/material';

export const CustomLegend = ({ labels }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 4 }}>
      {labels.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <span
            style={{
              display: 'inline-block',
              width: '1rem',
              height: '1rem',
              borderRadius: '50%',
              marginRight: '1rem',
              backgroundColor: item.color,
            }}
          />
          <Typography variant="p">{item.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};
