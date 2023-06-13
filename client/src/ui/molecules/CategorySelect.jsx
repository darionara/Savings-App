import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CategoryCell } from '../molecules/CategoryCell';

export const CategorySelect = ({ categories, onChange, selected }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="category-label">Wybierz kategorię</InputLabel>
      <Select
        value={selected}
        onChange={handleChange}
        label="Wybierz kategorię"
        labelId="category-label"
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            <CategoryCell name={category.name} color={category.color} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};