import React from 'react';
import { Box } from '@mui/material';

function Success(props) {
  return (
    <Box
      sx={{
        ml: props.theme.spacing(3),
        mt: props.theme.spacing(1),
        color: 'green',
      }}
    >
      Success! {props.record.nftTokenType} #{props.record.nftTokenId}'s new record is
      on-chain and unalterable.
    </Box>
  );
}

export default Success;
