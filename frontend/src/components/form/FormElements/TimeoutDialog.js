import React from 'react';
import { Box } from '@mui/material';

import theme from '../../../Styles';

const styles = {
  root: {
    ml: theme.spacing(3),
    mt: theme.spacing(1),
    color: 'green',
  },
};

function TimeoutDialog() {
  return (
    <Box sx={styles.root}>
      Timeout. This may be do to a network issue. If you have successfully
      minted a record, our system will automatically publish it. No further
      action required.
    </Box>
  );
}

export default TimeoutDialog;
