import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

import theme from '../../Styles';

export default function AlertBuilderToken(props) {
  return (
    <Stack sx={{ cursor: 'pointer', width: '100%' }} spacing={2}>
      <Alert onClick={() => props.modalControl()} severity='warning'>
        <AlertTitle sx={{ fontWeight: 'bold' }}>
          You must own at least 1 Builder Token to mint a record.
        </AlertTitle>
        Owning a Builder Token NFT grants access to all Public Record services.{' '}
        <Button sx={{ ml: theme.spacing(3) }} variant='contained'>
          Get a Builder Token
        </Button>
      </Alert>
    </Stack>
  );
}
