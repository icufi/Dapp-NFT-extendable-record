import React from 'react';
import { Typography, Grid, Container } from '@mui/material';

const Footer = () => {
  return (
    <Container sx={{ marginTop: 15, marginBottom: 3 }}>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={4}>
          <a
            style={{ textDecoration: 'none', color: '#212529' }}
            href='https://twitter.com/VisibleNFT'
            target='_blank'
            rel='noreferrer'
          >
            <Typography variant='h6'>Twitter</Typography>
          </a>
        </Grid>
        <Grid item xs={4}>
          <a
            style={{ textDecoration: 'none', color: '#212529' }}
            href='https://discord.gg/9vVXynEcvh'
            target='_blank'
            rel='noreferrer'
          >
            <Typography variant='h6'>Discord</Typography>
          </a>
        </Grid>
        <Grid item xs={4}>
          <a
            style={{ textDecoration: 'none', color: '#212529' }}
            href='https://polygonscan.com/'
            target='_blank'
            rel='noreferrer'
          >
            <Typography variant='h6'>Polygonscan</Typography>
          </a>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
