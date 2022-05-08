import React from 'react'
import {Box, Typography} from '@mui/material'

import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'

function TrxSpinner({theme}) {
  return (
    <Box
      sx={{ mt: theme.spacing(2), pb: theme.spacing(2) }}
      xs={12}
      textAlign='center'
    >
      <LoadingSpinner />
      <Typography sx={{ mt: theme.spacing(3), padding: theme.spacing(2) }}>
        Keep this dialog box open until you receive a transaction 'success' or
        'error' message.
      </Typography>
    </Box>
  );
}

export default TrxSpinner
