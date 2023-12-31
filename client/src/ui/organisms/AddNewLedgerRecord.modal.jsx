import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CategoryService, LedgerService } from 'api';
import { CATEGORIES_QUERY, LEDGER_QUERY, BUDGET_QUERY, SUMMARY_QUERY } from 'queryKeys';
import { Modal, CategorySelect, Loader, Error, NoContent, AmountFormField} from 'ui';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { formatDollarsToCents } from 'utils';
import { MESSAGES } from 'consts/Notification.messages';
import { DESCRIPTIONS } from 'consts/Descriptions';
import { LIMITS } from 'consts/Limits';

export const AddNewLedgerRecord = ({ type, onClose, open, showNotification }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data: categories } = useQuery({
    queryKey: [CATEGORIES_QUERY],
    queryFn: () => CategoryService.findAll()
  });

  const createMutation = useMutation({
    mutationFn: (formData) => {
      return LedgerService.create({ requestBody: formData })
    },
    onSuccess: async (formData) => {
      await queryClient.invalidateQueries([LEDGER_QUERY]);
      await queryClient.invalidateQueries([BUDGET_QUERY]);
      await queryClient.invalidateQueries([SUMMARY_QUERY]);
      onClose();
      reset();
      formData.mode === 'INCOME' ? 
      showNotification(MESSAGES.SUCCESS.ADD_INCOME, 'success') : 
      showNotification(MESSAGES.SUCCESS.ADD_EXPENSE, 'success')
    },
    onError: () => {
      showNotification(MESSAGES.ERROR, 'error')
    }
  });

  const { handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
    defaultValues: {
      title: '',
      amount: '',
      category: ''
    },
    mode: 'onChange'
  });

  const handleFormSubmit = (formData) => {
    createMutation.mutate({ 
      mode: type, 
      title: formData.title, 
      amountInCents: formatDollarsToCents(formData.amount), 
      categoryId: formData.category 
    });
    onClose();
    reset();
  }

  const formStyle = {
    marginTop: 37,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  };

  return (
    <Modal description={DESCRIPTIONS[type]} 
           onClose={onClose}
           onSubmit={handleSubmit(handleFormSubmit)}
           open={open}
           disabled={!isValid}
          >
        {isLoading && <Loader />}
        {error && <Error error={error} />}
        {!isLoading && !error && !categories?.length ? (
          <NoContent />
        ) : (
        <div style={formStyle}>
          <Controller
            name='title'
            control={control}
            rules={{
              required: 'Nazwa nie może być pusta',
              validate: {
                noEmptySpaces: value => !value.trim().length ? 'Nazwa nie może być pusta' : true
              }
            }}
            render={({ field }) => (
              <TextField {...field} 
                label='Nazwa'
                type='text'
                error={!!errors.title} 
                helperText={errors.title?.message}
              >
              </TextField>
            )}
          />
          <AmountFormField 
            control={control}
            errors={errors} 
            lessThan={LIMITS.LESS_THAN}
          />
          {type === 'EXPENSE' && (
            <Controller 
              name='category'
              control={control}
              rules={{
                required: 'Wybierz kategorię'
              }} 
              render={({ field: {onChange, value} }) => (
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
          )}
       </div>
      )}
    </Modal>
  );
};

AddNewLedgerRecord.propTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  showNotification: PropTypes.func
};
