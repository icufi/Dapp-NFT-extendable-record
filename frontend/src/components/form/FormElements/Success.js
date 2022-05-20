import React from 'react';
import { Box } from '@mui/material';

import theme from '../../../Styles'

const styles = {
  root: {
    ml: theme.spacing(3),
    mt: theme.spacing(1),
    color: 'green',
  },
};

function Success(props) {
  return (
    <Box
      sx={styles.root}
    >
      Success! {props.record.nftTokenType} #{props.record.nftTokenId}'s new record is
      on-chain and unalterable.
    </Box>
  );
}

export default Success;
