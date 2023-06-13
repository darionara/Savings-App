import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CategoryService } from '../../api/services/CategoryService';
import { LedgerService } from '../../api/services/LedgerService';
import { CATEGORIES_QUERY } from 'queryKeys';
import { LEDGER_QUERY } from 'queryKeys';
import { Modal } from '../molecules/Modal';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { CategorySelect } from '../molecules/CategorySelect';

export const AddNewLedgerRecord = ({ type, onClose, open }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');

  const handleChange = (category) => {
    setSelected(category);
  };

  const { data } = useQuery({
    queryKey: [CATEGORIES_QUERY],
    queryFn: () => CategoryService.findAll()
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (formData) => {
      return LedgerService.create({ requestBody: formData })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([LEDGER_QUERY]);
    }
  });

  useEffect(() => {
    if (data) {
      setCategories(data)
    }
  },[data]);

  const { handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
    defaultValues: {
      title: '',
      amount: ''
    },
    mode: 'onChange'
  });

  const handleFormSubmit = (formData) => {
    createMutation.mutate({ 
      mode: type, 
      title: formData.title, 
      amountInCents: formData.amount*100, 
      categoryId: formData === '' ? null : selected
    })
    onClose()
    setSelected('')
    reset()
  }

  const descriptions = {
    INCOME: 'Dodaj wpływ',
    EXPENSE: 'Dodaj wydatek'
  };

  const formStyle = {
    marginTop: 37,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  };

  return (
    <Modal description={descriptions[type]} 
           onClose={onClose}
           onSubmit={handleSubmit(handleFormSubmit)}
           open={open}
           disabled={!isValid}>
      <div style={formStyle}>
        <Controller
          name='title'
          control={control}
          rules={{
            required: 'Nazwa nie może byc pusta',
            validate: {
              noEmptySpaces: value => !value.trim().length ? 'Nazwa nie może byc pusta' : true
            }
          }}
          render={({ field }) => (
            <TextField {...field} 
              label='Nazwa'
              error={!!errors.title} 
              helperText={errors.title?.message}
            >
            </TextField>
        )}
        />
        <Controller
          name='amount'
          type='number'
          control={control}
          rules={{
            required: 'Kwota nie może być pusta',
            validate: {
              greaterThanZero: value => value > 0 || 'Kwota musi być większa niż 0',
              lessThanMillion: value => value < 1000000 || 'Kwota nie może być większa niż 1000000'
            }
          }}
          render={({ field }) => (
            <TextField {...field} 
              label='Kwota'
              error={!!errors.amount}
              helperText={errors.amount?.message}
            >
            </TextField>
        )} 
        />
        {type === 'EXPENSE' && (
          <Controller 
            name='category'
            control={control}
            render={({ field }) => (
              <CategorySelect {...field} 
                onChange={handleChange} 
                categories={categories} 
                selected={selected}>
              </CategorySelect>
            )} 
          />
        )}
      </div>
    </Modal>
  );
};
