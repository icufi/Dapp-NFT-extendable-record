import React from 'react';
import { Container, Grid } from '@mui/material';

import ModeArray from './ModeArray';
import DialogEmailTrx from './DialogEmailTrx';

const ModeTrx = (props) => {
  const { classes, tokenOwner, onSubmitMintRecord, ...other } = props;
  return (
    <Container className={classes.root}>
      <Grid container>
        <ModeArray
          tokenOwner={tokenOwner}
          onSubmitMintRecord={onSubmitMintRecord}
          {...other}
        />
        <DialogEmailTrx {...other} />
      </Grid>
    </Container>
  );
};

export default ModeTrx;
