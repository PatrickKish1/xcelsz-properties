import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { getCountries, getCities, getRegions } from '../lib/data';

export const LocationFilter = ({ onLocationChange, defaultCountry, defaultCity }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry || '');
  const [selectedCity, setSelectedCity] = useState(defaultCity || '');
  const [selectedRegion, setSelectedRegion] = useState('');

  // Load countries on mount
  useEffect(() => {
    setCountries(getCountries());
  }, []);

  // Update cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      setCities(getCities(selectedCountry));
    } else {
      setCities([]);
    }
    setSelectedCity('');
    setSelectedRegion('');
  }, [selectedCountry]);

  // Update regions when city or country changes
  useEffect(() => {
    if (selectedCountry && selectedCity) {
      setRegions(getRegions(selectedCountry, selectedCity));
    } else {
      setRegions([]);
    }
    setSelectedRegion('');
  }, [selectedCountry, selectedCity]);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    onLocationChange(country, null, null);
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    onLocationChange(selectedCountry, null, city);
  };

  const handleRegionChange = (event) => {
    const region = event.target.value;
    setSelectedRegion(region);
    onLocationChange(selectedCountry, region, selectedCity);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, minWidth: { xs: '100%', sm: 'auto' } }}>
      <FormControl 
        size="small" 
        sx={{ 
          minWidth: { xs: '100%', sm: 120 },
          fontFamily: 'Lato, sans-serif'
        }}
      >
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCountry}
          label="Country"
          onChange={handleCountryChange}
        >
          <MenuItem value="">
            <em>All Countries</em>
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl 
        size="small" 
        sx={{ 
          minWidth: { xs: '100%', sm: 120 },
          fontFamily: 'Lato, sans-serif'
        }}
        disabled={!selectedCountry}
      >
        <InputLabel id="city-select-label">City</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={selectedCity}
          label="City"
          onChange={handleCityChange}
        >
          <MenuItem value="">
            <em>All Cities</em>
          </MenuItem>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl 
        size="small" 
        sx={{ 
          minWidth: { xs: '100%', sm: 120 },
          fontFamily: 'Lato, sans-serif'
        }}
        disabled={!selectedCity}
      >
        <InputLabel id="region-select-label">Region</InputLabel>
        <Select
          labelId="region-select-label"
          id="region-select"
          value={selectedRegion}
          label="Region"
          onChange={handleRegionChange}
        >
          <MenuItem value="">
            <em>All Regions</em>
          </MenuItem>
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LocationFilter;