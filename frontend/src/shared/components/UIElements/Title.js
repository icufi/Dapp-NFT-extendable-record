import React from 'react'
import { Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import theme from '../../../Styles'

const styles = {
  hero: {
    mb: { md: theme.spacing(10), xs: theme.spacing(1) },
  },
  title: {
    fontSize: { md: '48px' },
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: { md: '16px' },
  },
};

const Title = () => {
  return (
    <Grid item sx={styles.hero} xs={12}>
      <Typography align='center' variant='h1' sx={styles.title}>
        Create Visible Records For Your NFT
      </Typography>
      <Box sx={styles.subTitle} textAlign={'center'}>
        artists get 50% revenue share: <Link to='/mode'>learn more</Link>
      </Box>
    </Grid>
  );
}

export default Title