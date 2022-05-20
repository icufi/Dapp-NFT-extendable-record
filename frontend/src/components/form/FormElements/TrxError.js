import React from 'react'
import {Box} from '@mui/material'

import theme from '../../../Styles';

const styles = {
  root: {
    mr: theme.spacing(3),
    ml: theme.spacing(3),
    mt: theme.spacing(1),
    color: 'red',
  },
};

function TrxError(props) {
  return (
    <Box
      sx={styles.root}
    >
      Error: {props.err.message}
    </Box>
  );
}

export default TrxError