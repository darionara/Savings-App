import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { BudgetService } from 'api';
import { BUDGET_QUERY, SUMMARY_QUERY, NOT_SELECTED_CATEGORIES_QUERY } from 'queryKeys';
import { Table, Loader, Error, NoContent, Money, LocalizedDate, CategoryCell } from 'ui';
import { MESSAGES } from 'consts/Notification.messages';

export const BudgetWidget = ({ showNotification }) => {
  const queryClient = useQueryClient();

  const { isLoading, data, error} = useQuery({
    queryKey: [BUDGET_QUERY],
    queryFn: () => BudgetService.findAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (selectedRows) => {
      return BudgetService.remove({ ids: selectedRows })
    }, 
    onSuccess: async () => {
      await queryClient.invalidateQueries([BUDGET_QUERY]);
      await queryClient.invalidateQueries([NOT_SELECTED_CATEGORIES_QUERY]);
      await queryClient.invalidateQueries([SUMMARY_QUERY]);
      showNotification(MESSAGES.SUCCESS.REMOVE_RECORD, 'success')
    },
    onError: () => {
      showNotification(MESSAGES.ERROR, 'error')
    }});

  const deleteRecords = (selectedRows) => deleteMutation.mutate(selectedRows);

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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!data?.length) {
    return <NoContent />;
  }

  return (
    <Table
      headCells={headCells}
      rows={data}
      getUniqueId={(row) => row.id}
      deleteRecords={deleteRecords}
    />
  );
};
