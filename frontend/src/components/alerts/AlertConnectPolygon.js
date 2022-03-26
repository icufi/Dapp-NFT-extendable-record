import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function AlertConnectPolygon(props) {
  return (
    <Stack sx={{ cursor: 'pointer', width: '100%' }} spacing={2}>
      <Alert severity='warning'>
        <AlertTitle sx={{ fontWeight: 'bold' }}>
          Change Metamask network to Polygon to continue.
        </AlertTitle>
      </Alert>
    </Stack>
  );
}
