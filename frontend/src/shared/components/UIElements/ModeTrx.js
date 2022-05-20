import React from 'react';
import { Container, Grid } from '@mui/material';

import ModeArray from './ModeArray';
import DialogEmailTrx from './DialogEmailTrx';

import theme from '../../../Styles';

const styles = {
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
};

const ModeTrx = (props) => {
  const {tokenOwner, onSubmitMintRecord, ...other } = props;
  return (
    <Container sx={styles.root}>
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
