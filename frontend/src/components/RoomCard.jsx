import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Box, Typography } from '@mui/material';
import Button from './ui/Button';
import { formatPriceGh, formatPriceUSD, formatPostedTime } from '../lib/utils';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// This is a placeholder for the ImageSlider you already have
const ImageSlider = ({ urls }) => (
  <div className="aspect-square w-full bg-gray-200">
    <img 
      src={urls[0]} 
      alt="Property" 
      className="w-full h-full object-cover"
    />
  </div>
);

const RoomCard = ({ room }) => {
  const {
    roomId,
    name,
    images,
    price,
    address,
    posted,
    availability
  } = room;

  const formatAddress = () => {
    if (!address) return "Location not specified";
    
    if (typeof address === 'object') {
      const parts = [
        address.location,
        address.city,
        address.region,
        address.country
      ].filter(Boolean);
      return parts.join(", ");
    }

    return "Location not specified";
  };

  const getAvailabilityDisplay = () => {
    if (!availability) return "Status not available";

    const status = typeof availability === 'object' ? availability.status : "not available";
    const availableFrom = typeof availability === 'object' ? availability.availableFrom : null;

    if (status === "available") {
      if (!availableFrom) return "Available Now";
      if (availableFrom === "Today") return "Available Now";
      return `Available from ${availableFrom}`;
    }
    
    return status === "booked" ? "Not Available" : "Status not available";
  };

  const isAvailable = () => {
    if (!availability) return false;
    if (typeof availability === 'string') return availability === "available";
    return availability.status === "available";
  };

  const formatPrice = () => {
    if (!price) return "0";
    
    if (typeof price === 'object' && 'pricePerMonth' in price) {
      const amount = price.pricePerMonth;
      const currency = price.currency || "GHS";
      
      if (currency === "GHS") {
        return `GH₵ ${amount}`;
      } else if (currency === "USD") {
        return formatPriceUSD(amount);
      } else {
        // Default to GHC if currency is not recognized
        return formatPriceGh(amount.toString());
      }
    }
    
    // Fall back to original behavior for backward compatibility
    return formatPriceGh(price.toString());
  };

  return (
    <Card 
      className="h-full flex flex-col overflow-hidden rounded-lg border w-full shadow-lg hover:shadow-xl transition-shadow"
      sx={{ 
        maxWidth: { sm: '100%', md: '400px' },
        width: '100%',
        fontFamily: 'Lato, sans-serif'
      }}
    >
      <Link to={`/book/${roomId}`} className="block h-full">
        <Box className="aspect-square w-full">
          <ImageSlider 
            urls={images?.length > 0 ? images : ["https://v17.angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg"]} 
          />
        </Box>
        
        <CardContent sx={{ p: 2, flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111111', fontSize: '1.125rem', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {name || "Unnamed Property"}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111111', whiteSpace: 'nowrap', ml: 1 }}>
              {formatPrice()}
              <Typography component="span" variant="caption" sx={{ color: '#8c8c83', ml: 0.5 }}>
                /month
              </Typography>
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <LocationOnIcon sx={{ fontSize: 18, color: '#8c8c83' }} />
            <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {formatAddress()}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: 18, color: '#8c8c83' }} />
              <Typography variant="body2" color="text.secondary">
                {getAvailabilityDisplay()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
              <AccessTimeIcon sx={{ fontSize: 18, color: '#8c8c83' }} />
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                {formatPostedTime(posted)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Link>

      <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
        <Button 
          fullWidth
          disabled={!isAvailable()}
          component={Link}
          to={`/book/${roomId}`}
          sx={{
            backgroundColor: '#8C8C83',
            '&:hover': {
              backgroundColor: '#00C5F1'
            },
            fontWeight: 600
          }}
        >
          {isAvailable() ? "Book Now" : "Not Available"}
        </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default RoomCard;