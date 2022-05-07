import React,{Typography} from 'react'
import { Grid } from '@mui/material';

import theme from '../../../../Styles'

const BTBuyResponse = ({error, trxSuccess}) => {
  return (
    <div>
      {error && (
        <Grid
          xs={12}
          sx={{
            paddingTop: theme.spacing(2),
          }}
          item
        >
          <Typography variant='h7' sx={{ color: 'red' }}>
            {error}
          </Typography>
        </Grid>
      )}
      {trxSuccess && (
        <Grid
          xs={9}
          sx={{
            pt: theme.spacing(3),
            pl: theme.spacing(3),
          }}
          item
        >
          <Typography sx={{ fontSize: '18px', color: 'green' }}>
            Success! Builder Token minted.
          </Typography>
        </Grid>
      )}
    </div>
  );
}

export default BTBuyResponse