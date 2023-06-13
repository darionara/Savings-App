import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { LedgerService } from '../../api/services/LedgerService';
import { LEDGER_QUERY } from 'queryKeys';
import { ActionHeader, Card, Button, Table, CategoryCell, Money, LocalizedDate, Loader, Error, NoContent } from 'ui';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AddNewLedgerRecord } from './AddNewLedgerRecord.modal';

export const LedgerWidget = () => {
  const [openModalType, setOpenModalType] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error} = useQuery({
    queryKey: [LEDGER_QUERY],
    queryFn: () => LedgerService.findAll()
  });

  const deleteMutation = useMutation({
    mutationFn: (selectedRows) => {
      return LedgerService.remove({ ids: selectedRows })
    }, 
    onSuccess: async () => {
      await queryClient.invalidateQueries([LEDGER_QUERY])
    }});

  const deleteRecords = (selectedRows) => deleteMutation.mutate(selectedRows);

  const headCells = [
    {id: '1', label: 'Nazwa', renderCell: (row) => row.title},
    {id: '2', label: 'Kategoria', renderCell: (row) => <CategoryCell name={row.category.name} color={row.category.color} />},
    {id: '5', label: 'Data', renderCell: (row) => <LocalizedDate date={row.createdAt} />},
    {id: '4', label: 'Kwota', renderCell: (row) => {
      if (row.mode === 'INCOME') return <span style={{color: 'green'}}> + <Money inCents={row.amountInCents} /></span>
      if (row.mode === 'EXPENSE') return <span style={{color: 'red'}}> - <Money inCents={row.amountInCents} /></span>
      },
    }
  ];

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

        <AddNewLedgerRecord type={openModalType} 
                            onClose={() => setOpenModalType(null)} 
                            open={!!openModalType} />

      </Card>
  );
};
