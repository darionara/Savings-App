import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CategoryService } from '../../api/services/CategoryService';
import { CATEGORIES_QUERY } from 'queryKeys';
import { BudgetService } from '../../api/services/BudgetService';
import { BUDGET_QUERY } from 'queryKeys';
import { Modal } from '../molecules/Modal';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { CategorySelect } from '../molecules/CategorySelect';

export const AddNewBudgetRecord = ({ onClose, open}) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');
  
  const handleChange = (category) => {
    setSelected(category);
  };

  const { data } = useQuery({
    queryKey: [CATEGORIES_QUERY],
    queryFn: () => CategoryService.findAll(true)
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (formData) => {
      return BudgetService.create({ requestBody: formData })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([BUDGET_QUERY])
    }
  });

  useEffect(() => {
    if (data) {
      setCategories(data)
    }
  },[data]);

  const { handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
    defaultValues: {
      amount: ''
    },
    mode: 'onChange'
  });

  const handleFormSubmit = (formData) => {
    createMutation.mutate({ 
      amountInCents: formData.amount*100, 
      categoryId: formData === '' ? null : selected
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
      <div style={formStyle}>
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
              label="Kwota"
              error={!!errors.amount}
              helperText={errors.amount?.message}
            >
            </TextField>
        )} 
        />
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
      </div>
    </Modal>
  );
};