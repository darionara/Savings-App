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
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: item.color,
            }}
          />
          <Typography variant="p" style={{width: 'calc(100% - 32px)', marginLeft: '16px'}}>{item.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};
