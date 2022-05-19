import React from 'react';
import { Typography, Grid, Container } from '@mui/material';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 15,
    mb: 3,
  },
  links: {
    textDecoration: 'none',
    color: '#212529',
  },
};

const Footer = () => {
  return (
    <Container sx={styles.root}>
      <Grid item xs={4}>
        <a
          style={styles.links}
          href='https://twitter.com/VisibleNFT'
          target='_blank'
          rel='noreferrer'
        >
          <Typography variant='h6'>Twitter</Typography>
        </a>
      </Grid>
      <Grid item xs={4}>
        <a
          style={styles.links}
          href='https://discord.gg/9vVXynEc'
          target='_blank'
          rel='noreferrer'
        >
          <Typography variant='h6'>Discord</Typography>
        </a>
      </Grid>
      <Grid item xs={4}>
        <a
          style={styles.links}
          href='https://polygonscan.com/'
          target='_blank'
          rel='noreferrer'
        >
          <Typography variant='h6'>Polygonscan</Typography>
        </a>
      </Grid>
    </Container>
  );
};

export default Footer;
