import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import Router from './pages/routing';
import { theme } from 'theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { StyledSnackbar } from './ui/atoms/Notification';

const queryClient = new QueryClient();

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider 
            maxSnack={3}
            autoHideDuration={5000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            /* Components={{
              success: StyledSnackbar,
              error: StyledSnackbar,
            }} */>
            <Router />
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
  );
};

export default App;
