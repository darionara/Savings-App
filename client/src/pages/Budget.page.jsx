import React, { useState } from 'react';
import { ActionHeader, Button, Card, Page, BudgetWidget, AddNewBudgetRecord } from 'ui';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';

export const BudgetPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  
  const showNotification = (message, variant) => {
    enqueueSnackbar(message, {variant});
  };

  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Twój budżet"
            renderActions={() => (
              <Button 
                color='primary'
                variant='contained'
                startIcon={<AddIcon />}
                onClick={() => setIsModalOpen(true)}
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
            <BudgetWidget 
              showNotification={showNotification} />
            <AddNewBudgetRecord 
              onClose={() => setIsModalOpen(false)}
              open={isModalOpen}
              showNotification={showNotification} 
            />
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
