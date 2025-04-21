import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Rooms from './pages/Rooms';

// Custom theme to match our brand colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#00C5F1',
      dark: '#0099b8',
      light: '#66d9f7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#8C8C83',
      dark: '#6e6e68',
      light: '#a3a39c',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#111111',
      secondary: '#8c8c83',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;