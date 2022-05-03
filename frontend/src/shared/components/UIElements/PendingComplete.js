import React from 'react'
import {DialogTitle} from '@mui/material'


function PendingComplete({receipt, err}) {
  return (
    <div>
      {err ? (<DialogTitle xs={6} id='scroll-dialog-title'>
          Your mint has failed.
        </DialogTitle>) : receipt ? (
        <DialogTitle xs={6} id='scroll-dialog-title'>
          Your mint is complete.
        </DialogTitle>
      ) : (
        <DialogTitle xs={6} id='scroll-dialog-title'>
          Your mint is pending...
        </DialogTitle>
      )}
    </div>
  );
}

export default PendingComplete