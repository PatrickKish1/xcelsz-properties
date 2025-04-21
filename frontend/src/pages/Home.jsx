import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia
} from '@mui/material';
import Button from '../components/ui/Button';
import Header from '../components/Header';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { HERO_IMAGES, BENEFITS } from '../lib/data';

// Assuming ImageSlider is provided by you
const ImageSlider = ({ urls }) => (
  <div className="relative aspect-square w-full h-full">
    <img 
      src={urls[0]} 
      alt="Hero" 
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
);

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <Box component="section" sx={{ pb: { xs: 8, md: 12 } }}>
        <MaxWidthWrapper>
          <Box sx={{ pt: { xs: 6, md: 8 } }}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '2.5rem', sm: '3.5rem' }, 
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: '#111111',
                      mb: 2,
                      fontFamily: 'Lato, sans-serif'
                    }}
                  >
                    Stay Easy, Pay Easy!
                  </Typography>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      color: '#8c8c83',
                      fontFamily: 'Lato, sans-serif'
                    }}
                  >
                    Find and book the perfect room for your stay with our
                    selection of rooms and apartments. Live Freely and{" "}
                    <Box component="span" sx={{ color: '#00C5F1' }}>Pay Monthly!</Box>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    component={Link} 
                    to="/rooms"
                    size="lg"
                    sx={{ 
                      borderRadius: '1.5rem',
                      backgroundColor: '#8C8C83',
                      fontSize: '1.125rem',
                      '&:hover': {
                        backgroundColor: '#00C5F1'
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Box sx={{ 
                  position: 'relative',
                  aspectRatio: { xs: '1', lg: '2/1' },
                  width: '100%',
                  height: { xs: 'auto', lg: '400px' }
                }}>
                  <ImageSlider urls={HERO_IMAGES} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </MaxWidthWrapper>
      </Box>

      {/* Benefits Section */}
      <Box 
        component="section" 
        sx={{ 
          py: { xs: 6, md: 8 }, 
          backgroundColor: '#c5c5c1'
        }}
      >
        <MaxWidthWrapper>
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 6, 
              fontSize: '2rem', 
              fontWeight: 700,
              color: '#111111',
              fontFamily: 'Lato, sans-serif'
            }}
          >
            Why Us?
          </Typography>
          <Grid container spacing={3}>
            {BENEFITS.map((benefit, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: 80,
                      height: 80,
                      objectFit: 'contain',
                      mb: 2,
                      pt: 2,
                      pb: 1.5
                    }}
                    image={benefit.image}
                    alt={benefit.title}
                  />
                  <CardContent sx={{ textAlign: 'center', p: 0 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: '#00C5F1',
                        mb: 1,
                        fontFamily: 'Lato, sans-serif'
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#111111',
                        fontFamily: 'Lato, sans-serif'
                      }}
                    >
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MaxWidthWrapper>
      </Box>

      {/* About Us Section */}
      <Box 
        component="section" 
        sx={{ 
          py: { xs: 8, md: 12 },
          mt: 5,
          borderBottom: '4px solid #00c5f1'
        }}
      >
        <MaxWidthWrapper>
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 6, 
              fontSize: '2rem', 
              fontWeight: 700,
              color: '#111111',
              textAlign: 'center',
              fontFamily: 'Lato, sans-serif'
            }}
          >
            About Us
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1.125rem',
              color: '#8c8c83',
              lineHeight: 1.7,
              textAlign: 'center',
              maxWidth: '4xl',
              mx: 'auto',
              fontFamily: 'Lato, sans-serif'
            }}
          >
            Welcome to <Box component="span" sx={{ color: '#111111' }}>xcelsz</Box>
            <Box component="span" sx={{ color: '#00c5f1' }}>properties</Box>, where we aim to revolutionize the
            way people find and book accommodations. With a passion for real estate, Patrick founded Xcelsz Properties to transform the rental experience. Having spent years in Ghana and the 
            Netherlands and gained extensive industry experience including in these different countries (continents), 
            we are dedicated to creating a platform that prioritizes user-friendly navigation and transparent transactions.  
            Our platform is built on a foundation of trust, convenience, and innovation, offering a
            seamless experience for travelers and property owners alike. <Typography component="span" fontWeight="bold">We allow our users to rent on a monthly basis.</Typography> Whether
            you're seeking a cozy getaway or managing a property, we are here to
            connect you with the perfect opportunities to meet your needs. With
            a global reach and a customer-first approach, we strive to make
            every journey memorable.
          </Typography>
        </MaxWidthWrapper>
      </Box>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          backgroundColor: '#111111', 
          color: '#e5e1e1',
          py: 6,
          mt: { xs: 7.5, md: 'auto' }
        }}
      >
        <MaxWidthWrapper>
          <Grid container spacing={4}>
            {/* Company Logo and Tagline */}
            <Grid item xs={12} sm={6} lg={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: 'Lato, sans-serif',
                  mb: 2 
                }}
              >
                <Box component="span" sx={{ color: '#fff' }}>xcelsz</Box>
                <Box component="span" sx={{ color: '#00c5f1' }}>properties</Box>
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: '#e5e1e1',
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Your trusted property rental platform
              </Typography>
            </Grid>

            {/* Contact Details */}
            <Grid item xs={12} sm={6} lg={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#fff',
                  mb: 2,
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Contact Us
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  Email:{" "}
                  <Link
                    to="mailto:patrickkesh90@gmail.com"
                    style={{ color: '#00C5F1', textDecoration: 'none' }}
                  >
                    patrickkesh90@gmail.com
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  Phone:{" "}
                  <Link
                    to="tel:+23354896120"
                    style={{ color: '#00C5F1', textDecoration: 'none' }}
                  >
                    +233 54 849 6120
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  Address: New Airport Residential
                </Box>
              </Box>
            </Grid>

            {/* Booking Option */}
            <Grid item xs={12} sm={6} lg={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#fff',
                  mb: 2,
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Book Now
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  color: '#e5e1e1',
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Ready to start your journey? Click below to book your perfect
                stay.
              </Typography>
              <Button
                component={Link}
                to="/rooms"
                variant="contained"
                sx={{ 
                  backgroundColor: '#00C5F1',
                  '&:hover': {
                    backgroundColor: '#0099b8'
                  },
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Book Your Stay
              </Button>
            </Grid>

            {/* Privacy Policy & Terms */}
            <Grid item xs={12} sm={6} lg={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#fff',
                  mb: 2,
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Legal
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link
                    to="/privacy-policy"
                    style={{ color: '#00C5F1', textDecoration: 'none' }}
                  >
                    Privacy Policy
                  </Link>
                </Box>
                <Box component="li">
                  <Link
                    to="/terms-and-conditions"
                    style={{ color: '#00C5F1', textDecoration: 'none' }}
                  >
                    Terms & Conditions
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box 
            sx={{ 
              mt: 6, 
              pt: 3, 
              borderTop: '1px solid #333',
              textAlign: 'center',
              color: '#e5e1e1',
              fontSize: '0.875rem',
              fontFamily: 'Lato, sans-serif'
            }}
          >
            © {currentYear} <Box component="span" sx={{ color: '#fff' }}></Box>
            <Box component="span" sx={{ color: '#00c5f1' }}>xcelsz</Box>
            <Box component="span" sx={{ color: '#c5c5c1' }}>properties</Box>. All rights reserved.
          </Box>
        </MaxWidthWrapper>
      </Box>
    </Box>
  );
};

export default Home;