import { Box, Container } from '@mui/material';
import React from 'react';
import { AppBar } from 'ui';

export const Layout = ({ routing, children }) => {
  return (
    <>
      <AppBar routing={routing} />
      <Container maxWidth={'xl'} sx={{paddingBottom: 6}}>
        <Box mt={6}>{children}</Box>
      </Container>
    </>
  );
};
