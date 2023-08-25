import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { LedgerService } from 'api';
import { LEDGER_QUERY, SUMMARY_QUERY, BUDGET_QUERY } from 'queryKeys';
import { ActionHeader, Card, Button, Table, CategoryCell, AddNewLedgerRecord, Money, LocalizedDate, Loader, Error, NoContent } from 'ui';
import { Grid, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSnackbar } from 'notistack';
import { MESSAGES } from 'consts/Notification.messages';
import { HeadCell } from '../molecules/table/Table';
import { Ledger, Mode } from '../../api/services/LedgerService';

export const LedgerWidget = () => {
  const [openModalType, setOpenModalType] = useState<Mode | null>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const queryClient = useQueryClient();

  // The 'total' metadata is not included in the backend, so I fetched all the data and got the length of the array to get the total amount of rows
  const { data: totalLedgers } = useQuery<Ledger[]>({
    queryKey: [LEDGER_QUERY],
    queryFn: () => LedgerService.findAll(),
  });

  const totalRows = totalLedgers?.length ?? 0;

  const { isLoading, data, error } = useQuery<Ledger[]>({
    queryKey: [LEDGER_QUERY, page, perPage],
    queryFn: () => LedgerService.findAll(perPage, page * perPage, '-createdAt'),
  });

  const { enqueueSnackbar } = useSnackbar();
  
  const showNotification = (message: string, variant: 'success' | 'error') => {
    enqueueSnackbar(message, {variant});
  };

  const deleteMutation = useMutation({
    mutationFn: (selectedRows: string[]) => {
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

  const deleteRecords = (selectedRows: string[]) => deleteMutation.mutate(selectedRows);

  const headCells: HeadCell[] = [
    {id: '1', label: 'Nazwa', renderCell: (row: Ledger) => row.title},
    {id: '2', label: 'Kategoria', renderCell: (row: Ledger) => <CategoryCell name={row.category.name} color={row.category.color} />},
    {id: '5', label: 'Data', renderCell: (row: Ledger) => <LocalizedDate date={row.createdAt} />},
    {id: '4', label: 'Kwota', renderCell: (row: Ledger) => {
      if (row.mode === 'INCOME') {
        return (
          <Typography color={'success.main'} variant={'body2'}> 
            + <Money inCents={row.amountInCents} />
          </Typography>
      )}
      if (row.mode === 'EXPENSE') {
        return (
          <Typography color={'error.main'} variant={'body2'}> 
            - <Money inCents={row.amountInCents} />
          </Typography>
      )}},
    }
  ];

  isLoading && <Loader />

  error && <Error error={error} />
  
  !isLoading && !error && !data?.length && <NoContent />

  return (
    <Card
      subheader=''
      title={
        <ActionHeader
          variant={'h1'}
          title="Portfel"
          renderActions={(): JSX.Element => (
            <Box>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<AddIcon />}
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
            </Box>
          )}
        />
      }
    >
      <Grid container>
        <Grid item xs={12}>
          {!isLoading && !error && !!data?.length && (
            <Table
              headCells={headCells}
              rows={data}
              totalRows={totalRows}
              getUniqueId={(row: Ledger): string => row.id}
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
