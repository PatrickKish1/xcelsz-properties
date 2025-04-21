import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  Button, 
  MenuItem 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Navigation items
const pages = [
  { name: 'Home', path: '/' },
  { name: 'Find Rooms', path: '/rooms' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              color: '#111111',
              textDecoration: 'none',
            }}
          >
            <span className="text-black">xcelsz</span>
            <span className="text-[#00c5f1]">properties</span>
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: '#111111' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                >
                  <Typography textAlign="center" sx={{ fontFamily: 'Lato, sans-serif' }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              color: '#111111',
              textDecoration: 'none',
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}
          >
            <span className="text-black">my</span>
            <span className="text-[#00c5f1]">rent</span>
            <span className="text-[#8c8c83]">findr</span>
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: '#111111', 
                  display: 'block', 
                  mx: 2,
                  fontFamily: 'Lato, sans-serif',
                  '&:hover': {
                    color: '#00C5F1'
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Login/Register Buttons */}
          {/* <Box sx={{ display: 'flex' }}>
            <Button 
              component={Link} 
              to="/login"
              sx={{ 
                color: '#111111',
                fontFamily: 'Lato, sans-serif',
                display: { xs: 'none', md: 'flex' },
                '&:hover': {
                  color: '#00C5F1'
                }
              }}
            >
              Login
            </Button>
            <Button 
              component={Link} 
              to="/register"
              variant="contained"
              sx={{ 
                ml: 2,
                display: { xs: 'none', md: 'flex' },
                backgroundColor: '#8C8C83',
                fontFamily: 'Lato, sans-serif',
                '&:hover': {
                  backgroundColor: '#00C5F1'
                }
              }}
            >
              Register
            </Button>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;