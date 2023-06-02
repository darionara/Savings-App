import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { BudgetService } from '../api/services/BudgetService';

import { ActionHeader, Card, Page, Table, Loader, Error, NoContent, Money, LocalizedDate, CategoryCell, Button } from 'ui';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const BudgetPage = () => {

  const fetchTableData = async () => {
    return await BudgetService.findAll();
  }

  const { isLoading, isError, data: tableData } = useQuery({
    queryKey: ['tableData'],
    queryFn: fetchTableData,
  })

  const headCells = [
    {id: '1', label: 'Nazwa', renderCell: (row) => <CategoryCell name={row.category.name} color={row.category.color} />},
    {id: '2', label: 'Planowane wydatki', renderCell: (row) => <Money inCents={row.amountInCents} />},
    {id: '3', label: 'Obecna kwota', renderCell: (row) => <Money inCents={row.currentSpending} />},
    {id: '4', label: 'Status', renderCell: (row) => {
      if (row.currentSpending === row.amountInCents) {
        return 'Wykorzystany'
      } else if (row.currentSpending > row.amountInCents) {
        return 'Przekroczone'
      } else {
        return 'W normie'
      }
    }},
    {id: '5', label: 'Data utworzenia', renderCell: (row) => <LocalizedDate date={row.createdAt} />},
  ]

  const getUniqueId = (row) => row.id;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (selectedRows) => {
      return BudgetService.remove({ ids: selectedRows})
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tableData']})
    }})

  const deleteRecords = (selectedRows) => {
    mutation.mutate(selectedRows)
  }

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
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
           {isLoading ? (
              <Loader/>
            ) : isError ? (
              <Error/>
            ) : tableData && tableData.length > 0 ? (
              <Table
                headCells={headCells}
                rows={tableData}
                getUniqueId={getUniqueId}
                deleteRecords={deleteRecords}
              />
            ) : (
              <NoContent/>
            )}
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
