import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a9df4',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffffff',
      secondary: '#d5d7e1',
      blue: '#A6E5FF',
    },
  },
  typography: {

    fontFamily: 'Roboto',

    h3: {
      fontFamily: 'Roboto',
      fontSize: '2.2rem',
    },
    h2: {
      fontFamily: 'Roboto',
      fontSize: '2.2rem',
      marginTop: '35px',
      marginBottom: '35px',
    },
    h1: {
      fontFamily: 'Roboto',
      fontSize: '1.8rem',
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: '1.2rem',
    },
    h6: {
      fontFamily: 'Roboto',
      fontSize: '1rem',
    },
    h7: {
      fontFamily: 'Roboto',
      fontSize: '.8rem',
    },
  },
});

export default theme;
