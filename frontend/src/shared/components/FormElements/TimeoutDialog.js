import React from 'react'
import {Box} from '@mui/material'

function TimeoutDialog(props) {
  return (
    <Box
      sx={{
        ml: props.theme.spacing(3),
        mt: props.theme.spacing(1),
        color: 'green',
      }}
    >
      Timeout. This may be do to a network issue. If you have successfully
      minted a record, our system will automatically publish it. No further
      action required.
    </Box>
  );
}

export default TimeoutDialog