import React from 'react';
import { Grid } from '@mui/material';
import { LedgerWidget, Page, BalanceChart, BudgetChart } from 'ui';

export const WalletPage = () => {
  return (
    <Page title={'Portfel'}>
      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid item xs={12} md={8}>
          <LedgerWidget />
        </Grid>
        <Grid container item xs={12} md={4} spacing={3} style={{display: "block"}}>
          <Grid item xs={12} data-test-id={'wallet-top-sidebar'} sx={{height: "fit-content"}}>
            <BalanceChart />
          </Grid>
          <Grid item xs={12} data-test-id={'wallet-bottom-sidebar'} sx={{height: "fit-content"}}>
            <BudgetChart />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
};

