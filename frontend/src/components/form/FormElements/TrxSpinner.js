import React from 'react';
import { Box, Typography } from '@mui/material';

import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

import theme from '../../../Styles';

const styles = {
  root: { mt: theme.spacing(2), pb: theme.spacing(2) },
  dialog: { mt: theme.spacing(3), padding: theme.spacing(2) },
};

function TrxSpinner({ theme }) {
  return (
    <Box sx={styles.root} xs={12} textAlign='center'>
      <LoadingSpinner />
      <Typography sx={styles.dialog}>
        Keep this dialog box open until you receive a transaction 'success' or
        'error' message.
      </Typography>
    </Box>
  );
}

export default TrxSpinner;
