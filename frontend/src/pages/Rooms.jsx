import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  CircularProgress,
  Alert
} from '@mui/material';
import Header from '../components/Header';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import RoomCard from '../components/RoomCard';
import LocationFilter from '../components/LocationFilter';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { fetchRooms } from '../lib/data';
import Button from '../components/ui/Button';


const Rooms = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCountry, setSelectedCountry] = useState(
    searchParams.get('country') || null
  );
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get('city') || null
  );
  const [selectedRegion, setSelectedRegion] = useState(
    searchParams.get('region') || null
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || null
  );

  // Fetch rooms on component mount
  useEffect(() => {
    const getRooms = async () => {
      try {
        setIsLoading(true);
        const fetchedRooms = await fetchRooms();
        setRooms(fetchedRooms);
        setFilteredRooms(fetchedRooms);
      } catch (err) {
        setError("Failed to load rooms. Please try again later.");
        console.error("Error loading rooms:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getRooms();
  }, []);

  // Handle location filter change
  const handleLocationChange = (
    country, 
    region, 
    city
  ) => {
    setSelectedCountry(country);
    setSelectedRegion(region);
    setSelectedCity(city);
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredRooms(rooms);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = rooms.filter((room) => {
      const addressString = `${room.address.country}, ${room.address.location}, ${room.address.city}, ${room.address.region}`.toLowerCase();

      const searchableFields = [
        room.name.toLowerCase(),
        room.description.toLowerCase(),
        addressString
      ];

      return searchableFields.some(field => field.includes(lowerSearchTerm));
    });

    setFilteredRooms(filtered);
  };

  // Apply filters when filter values change
  useEffect(() => {
    let filtered = [...rooms];
  
    if (selectedCountry || selectedRegion || selectedCity) {
      filtered = filtered.filter((room) => {
        if (selectedCountry && room.address.country.toLowerCase() !== selectedCountry.toLowerCase()) {
          return false;
        }

        if (selectedRegion && room.address.region.toLowerCase() !== selectedRegion.toLowerCase()) {
          return false;
        }
        
        if (selectedCity && room.address.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
        
        return true;
      });
    }
  
    if (selectedCategory) {
      filtered = filtered.filter((room) => room.roomCategory?.toLowerCase() === selectedCategory.toLowerCase());
    }
  
    setFilteredRooms(filtered);
  }, [selectedCountry, selectedRegion, selectedCity, selectedCategory, rooms]);

  // Loading state
  if (isLoading) {
    return (
      <Box className="flex-1">
        <Header />
        <MaxWidthWrapper>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '80vh' 
          }}>
            <CircularProgress sx={{ color: '#00C5F1' }} />
          </Box>
        </MaxWidthWrapper>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box className="flex-1">
        <Header />
        <MaxWidthWrapper>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '50vh'
          }}>
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
            <Button 
              onClick={() => window.location.reload()}
              variant="contained"
              sx={{ 
                mt: 2,
                backgroundColor: '#00C5F1',
                '&:hover': {
                  backgroundColor: '#0099b8'
                } 
              }}
            >
              Retry
            </Button>
          </Box>
        </MaxWidthWrapper>
      </Box>
    );
  }

  return (
    <Box className="flex-1">
      <Header />
      <MaxWidthWrapper>
        <Box sx={{ 
          py: { xs: 4, md: 6 },
          mb: 10
        }}>
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: '#111111',
                fontFamily: 'Lato, sans-serif' 
              }}
            >
              Available Rooms
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 2,
              alignItems: { xs: 'stretch', lg: 'center' },
              justifyContent: { lg: 'space-between' }
            }}>
              <SearchBar onSearch={handleSearch} />
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2
              }}>
                <LocationFilter 
                  onLocationChange={handleLocationChange} 
                  defaultCountry={selectedCountry}
                  defaultCity={selectedCity}
                />
                <CategoryFilter 
                  onCategoryChange={handleCategoryChange}
                  defaultCategory={selectedCategory}
                />
              </Box>
            </Box>
          </Box>

          {filteredRooms.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: 6,
              fontFamily: 'Lato, sans-serif'
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: '#111111',
                  mb: 1
                }}
              >
                No rooms found
              </Typography>
              <Typography 
                variant="body1"
                sx={{ color: '#8c8c83' }}
              >
                Try adjusting your search or filters to find available rooms.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredRooms.map((room) => (
                <Grid item xs={12} sm={6} lg={4} key={room.roomId}>
                  <RoomCard room={room} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </MaxWidthWrapper>
    </Box>
  );
};

export default Rooms;