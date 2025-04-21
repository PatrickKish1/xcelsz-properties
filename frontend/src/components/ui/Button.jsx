import React from 'react';
import { Button as MuiButton } from '@mui/material';

/**
 * Custom Button component using MUI Button with our styling
 */
const Button = ({ 
  children, 
  className = '', 
  variant = 'contained', 
  size = 'medium',
  color = 'primary',
  fullWidth = false,
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={`${className}`}
      color={color}
      sx={{
        borderRadius: size === 'lg' ? '1.5rem' : '0.75rem',
        fontSize: size === 'lg' ? '1.125rem' : '0.875rem',
        fontFamily: 'Lato, sans-serif',
        textTransform: 'none',
        padding: size === 'lg' ? '0.75rem 1.5rem' : '0.5rem 1rem',
        '&.MuiButton-containedPrimary': {
          backgroundColor: '#8C8C83',
          '&:hover': {
            backgroundColor: '#00C5F1',
          },
        },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;