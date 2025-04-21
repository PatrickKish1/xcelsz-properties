import React, { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', md: '350px' },
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        fontFamily: 'Lato, sans-serif'
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontFamily: 'Lato, sans-serif' }}
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        inputProps={{ 'aria-label': 'search rooms' }}
      />
      {searchTerm && (
        <IconButton 
          aria-label="clear" 
          onClick={handleClear}
          sx={{ p: '10px', color: '#8c8c83' }}
        >
          <ClearIcon />
        </IconButton>
      )}
      <IconButton 
        type="submit" 
        aria-label="search"
        sx={{ p: '10px', color: '#00C5F1' }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;