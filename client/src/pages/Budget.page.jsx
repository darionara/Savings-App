import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { BudgetService } from '../api/services/BudgetService';
import { BUDGET_QUERY } from 'queryKeys';
import { ActionHeader, Card, Page, Table, Loader, Error, NoContent, Money, LocalizedDate, CategoryCell, Button } from 'ui';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddNewBudgetRecord } from '../ui/organisms/AddNewBudgetRecord.modal';

export const BudgetPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSubmit = () => {
    console.log('Submit');
    setIsModalOpen(false)
  };

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error} = useQuery({
    queryKey: [BUDGET_QUERY],
    queryFn: () => BudgetService.findAll(),
  });

  const mutation = useMutation({
    mutationFn: (selectedRows) => {
      return BudgetService.remove({ ids: selectedRows })
    }, 
    onSuccess: async () => {
      await queryClient.invalidateQueries([BUDGET_QUERY])
    }});

  const deleteRecords = (selectedRows) => mutation.mutate(selectedRows);

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
  ];

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
           {isLoading ? (
              <Loader/>
            ) : isError ? (
              <Error error={error}/>
            ) : data && data.length > 0 ? (
              <Table
                headCells={headCells}
                rows={data}
                getUniqueId={(row) => row.id}
                deleteRecords={deleteRecords}
              />
            ) : (
              <NoContent/>
            )}
          </Grid>
        </Grid>

        <AddNewBudgetRecord onClose={() => setIsModalOpen(false)}
                            open={isModalOpen}
                            onSubmit={handleSubmit} />

      </Card>
    </Page>
  );
};
