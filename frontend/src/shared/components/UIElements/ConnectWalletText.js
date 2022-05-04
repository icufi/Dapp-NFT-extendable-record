import React from 'react'
import {Grid, Typography} from '@mui/material'

const ConnectWalletText = ({align, color, checkWallet, children}) => {
  return (
    <Grid xs={12} item>
      <Typography
        align= {align}
        sx={{
          color: color,
          fontSize: '14px',
          cursor: 'pointer',
        }}
        onClick={checkWallet}
      >
        {children}
      </Typography>
    </Grid>
  );
}

export default ConnectWalletText