import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CategoryService, BudgetService } from 'api';
import { NOT_SELECTED_CATEGORIES_QUERY, BUDGET_QUERY, SUMMARY_QUERY } from 'queryKeys';
import { Controller, useForm } from 'react-hook-form';
import { Modal, CategorySelect, AmountFormField, Loader, Error, NoContent } from 'ui';
import { formatDollarsToCents } from 'utils';
import { MESSAGES } from 'consts/Notification.messages';

export const AddNewBudgetRecord = ({ onClose, open, showNotification }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data: categories } = useQuery({
    queryKey: [NOT_SELECTED_CATEGORIES_QUERY],
    queryFn: () => CategoryService.findAll(true)
  });

  const createMutation = useMutation({
    mutationFn: (formData) => {
      return BudgetService.create({ requestBody: formData })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([BUDGET_QUERY]);
      await queryClient.invalidateQueries([NOT_SELECTED_CATEGORIES_QUERY]);
      await queryClient.invalidateQueries([SUMMARY_QUERY]);
      onClose();
      reset();
      showNotification(MESSAGES.SUCCESS.ADD_BUDGET, 'success');
    },
    onError: () => {
      showNotification(MESSAGES.ERROR, 'error')
    }
  });

  const { handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
    defaultValues: {
      amount: '',
      category: ''
    },
    mode: 'onChange'
  });

  const handleFormSubmit = (formData) => {
    createMutation.mutate({ 
      amountInCents: formatDollarsToCents(formData.amount), 
      categoryId: formData.category 
    });
    onClose()
    reset()
  }
  
  const formStyle = {
    marginTop: 37,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  };
  
  return (
    <Modal description={'Zdefiniuj budżet'} 
           onClose={onClose} 
           open={open} 
           onSubmit={handleSubmit(handleFormSubmit)}
           disabled={!isValid}
           >
        {isLoading && <Loader />}
        {error && <Error error={error} />}
        {!isLoading && !error && !categories?.length ? (
          <NoContent />
        ) : (
        <div style={formStyle}>
          <AmountFormField 
            control={control}
            errors={errors} 
            lessThan={1000000}
          />
          <Controller 
            name='category'
            control={control}
            rules={{
              required: 'Wybierz kategorię'
            }} 
            render={({ field: { onChange, value } }) => (
              <CategorySelect
                onChange={onChange}
                value={value} 
                categories={categories}
                error={!!errors.category}
                helperText={errors.category?.message}
                >
              </CategorySelect>
            )} 
          />
        </div>
      )}
    </Modal>
  );
};

AddNewBudgetRecord.propTypes = {
  open: PropTypes.bool,
  onclose: PropTypes.func,
  showNotification: PropTypes.func
}