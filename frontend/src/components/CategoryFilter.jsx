import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getCategories } from '../lib/data';

export const CategoryFilter = ({ onCategoryChange, defaultCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory || '');

  useEffect(() => {
    // Load categories on mount
    setCategories(getCategories());
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const formatCategoryName = (category) => {
    if (!category) return '';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <FormControl 
      size="small" 
      sx={{ 
        minWidth: { xs: '100%', sm: 160 },
        fontFamily: 'Lato, sans-serif'
      }}
    >
      <InputLabel id="category-select-label">Property Type</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        label="Property Type"
        onChange={handleCategoryChange}
      >
        <MenuItem value="">
          <em>All Types</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {formatCategoryName(category)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;