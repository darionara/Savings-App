import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { LedgerService } from 'api';
import { LEDGER_QUERY, SUMMARY_QUERY, BUDGET_QUERY } from 'queryKeys';
import { ActionHeader, Card, Button, Table, CategoryCell, AddNewLedgerRecord, Money, LocalizedDate, Loader, Error, NoContent } from 'ui';
import { Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSnackbar } from 'notistack';
import { MESSAGES } from 'consts/Notification.messages';

export const LedgerWidget = () => {
  const [openModalType, setOpenModalType] = useState(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const queryClient = useQueryClient();

  // The 'total' metadata is not included in the backend, so I fetched all the data and got the length of the array to get the total amount of rows
  const { data: totalLedgers } = useQuery({
    queryKey: [LEDGER_QUERY],
    queryFn: () => LedgerService.findAll(),
  });

  const totalRows = totalLedgers?.length ?? 0;

  const { isLoading, data, error } = useQuery({
    queryKey: [LEDGER_QUERY, page, perPage],
    queryFn: () => LedgerService.findAll(perPage, page * perPage),
  });

  const { enqueueSnackbar } = useSnackbar();
  
  const showNotification = (message, variant) => {
    enqueueSnackbar(message, {variant});
  };

  const deleteMutation = useMutation({
    mutationFn: (selectedRows) => {
      return LedgerService.remove({ ids: selectedRows })
    }, 
    onSuccess: async () => {
      await queryClient.invalidateQueries([LEDGER_QUERY]);
      await queryClient.invalidateQueries([BUDGET_QUERY]);
      await queryClient.invalidateQueries([SUMMARY_QUERY]);
      showNotification(MESSAGES.SUCCESS.REMOVE_RECORD, 'success');
    },
    onError: () => {
      showNotification(MESSAGES.ERROR, 'error');
    }});

  const deleteRecords = (selectedRows) => deleteMutation.mutate(selectedRows);

  const headCells = [
    {id: '1', label: 'Nazwa', renderCell: (row) => row.title},
    {id: '2', label: 'Kategoria', renderCell: (row) => <CategoryCell name={row.category.name} color={row.category.color} />},
    {id: '5', label: 'Data', renderCell: (row) => <LocalizedDate date={row.createdAt} />},
    {id: '4', label: 'Kwota', renderCell: (row) => {
      if (row.mode === 'INCOME') {
        return (
          <Typography color={'success.main'} variant={'p'}> 
            + <Money inCents={row.amountInCents} />
          </Typography>
      )}
      if (row.mode === 'EXPENSE') {
        return (
          <Typography color={'error.main'} variant={'p'}> 
            - <Money inCents={row.amountInCents} />
          </Typography>
      )}},
    }
  ];

  console.log(data);

  return (
    <Card
      title={
        <ActionHeader
          variant={'h1'}
          title="Portfel"
          renderActions={() => (
            <div>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<AddIcon/>}
                onClick={() => setOpenModalType('INCOME')}
              >
                Wpłać
              </Button>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<RemoveIcon/>}
                onClick={() => setOpenModalType('EXPENSE')}
              >
                Wypłać
              </Button>
            </div>
          )}
        />
      }
    >
      <Grid container>
        <Grid item xs={12}>
          {isLoading && <Loader />}
          {error && <Error error={error} />}
          {!isLoading && !error && !data?.length && <NoContent />}
          {!isLoading && !error && !!data?.length && (
            <Table
              headCells={headCells}
              rows={data}
              totalRows={totalRows}
              getUniqueId={(row) => row.id}
              deleteRecords={deleteRecords}
              page={page}
              perPage={perPage}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
          )}
          <AddNewLedgerRecord 
            type={openModalType} 
            onClose={() => setOpenModalType(null)} 
            open={!!openModalType}
            showNotification={showNotification} 
          />
          </Grid>
        </Grid>
      </Card>
  );
};
