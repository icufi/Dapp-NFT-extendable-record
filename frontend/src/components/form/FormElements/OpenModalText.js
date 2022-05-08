import React from 'react'
import {Typography} from '@mui/material'

const OpenModalText = ({handleOpen, children, color, align}) => {
  return (
    <Typography
      align={align}
      sx={{
        color: color,
        fontSize: '14px',
        cursor: 'pointer',
      }}
      onClick={handleOpen}
    >
      {children}
    </Typography>
  );
}

export default OpenModalText