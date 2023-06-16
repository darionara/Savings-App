import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export const AmountFormField = ({ control, errors, lessThan }) => {
  return (
    <Controller
      name='amount'
      control={control}
      rules={{
        required: 'Kwota nie może być pusta',
        validate: {
          greaterThanZero: value => value > 0 || 'Kwota musi być większa niż 0',
          lessThanMillion: value => value < lessThan || `Kwota nie może być większa niż ${lessThan}`
        }
      }}
      render={({ field }) => (
        <TextField {...field} 
          label='Kwota'
          type='number'
          error={!!errors.amount}
          helperText={errors.amount?.message}
        >
        </TextField>
      )} 
    />
  )
}

AmountFormField.propTypes = {
  control: PropTypes.object,
  errors: PropTypes.object,
  lessThan: PropTypes.number
}
