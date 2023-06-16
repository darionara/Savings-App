import React from 'react';
import { PropTypes } from 'prop-types';
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { CategoryCell } from 'ui';

export const CategorySelect = ({ categories, onChange, value }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="category-label">Wybierz kategorię</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label="Kategoria"
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

CategorySelect.propTypes = {
  categories: PropTypes.any,
  onChange: PropTypes.func,
  value: PropTypes.string
}