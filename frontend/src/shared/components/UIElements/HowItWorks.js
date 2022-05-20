import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import theme from '../../../Styles';

const styles = {
  list: {
    pt: theme.spacing(4),
  },
  root: { padding: theme.spacing(2) },
};

const HowItWorks = () => {
  return (
    <Grid sx={styles.root} xs={12} md={6} order={{ xs: 2, sm: 2, md: 1 }} item>
      <Grid item>
        <Box textAlign='center'>
          <Typography variant='h2'>How it works</Typography>
          <Typography>1. connect your Metamask</Typography>
          <Typography sx={styles.list}>
            2. select an NFT project you own
          </Typography>
          <Typography sx={styles.list}>
            3. enter token number you own
          </Typography>
          <Typography sx={styles.list}>
            4. enter optional message/keyword
          </Typography>
          <Typography sx={styles.list}>5. view a preview image</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HowItWorks;
