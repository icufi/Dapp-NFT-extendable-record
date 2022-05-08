import React from 'react'
import {Box} from '@mui/material'

function TrxError(props) {
  return (
    <Box
      sx={{
        mr: props.theme.spacing(3),
        ml: props.theme.spacing(3),
        mt: props.theme.spacing(1),
        color: 'red',
      }}
    >
      Error: {props.err.message}
    </Box>
  );
}

export default TrxError