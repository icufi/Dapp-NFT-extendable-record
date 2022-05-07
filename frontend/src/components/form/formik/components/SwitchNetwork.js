import React, {useContext} from 'react'
import {Grid, Typography, Box} from '@mui/material'
import { AuthContext } from '../../../../shared/context/auth-context';

import theme from '../../../../Styles'

const SwitchNetwork = () => {
const auth = useContext(AuthContext)


  return (
    <div>
      {
        // todo switch to 137 Mainnet
      }
      {auth.chainId !== 80001 && (
        <Grid
          xs={12}
          sx={{
            paddingTop: theme.spacing(2),
          }}
          item
        >
          <Typography variant='h7' sx={{ color: 'red' }}>
            Switch Metamask to Polygon Mainnet to complete transaction.
          </Typography>
          <Box
            sx={{
              fontSize: '14px',
              cursor: 'pointer',
              color: 'blue',
            }}
          >
            <ul>
              <li>
                <a
                  href='https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
                  target='blank'
                >
                  Set up Metamask for Polygon
                </a>
              </li>
              <li>
                <a
                  href='https://consensys.net/blog/metamask/how-to-bridge-tokens-from-ethereum-to-polygon-with-metamask/'
                  target='blank'
                >
                  Bridge Ethereum to Polygon
                </a>
              </li>
            </ul>
          </Box>
        </Grid>
      )}
    </div>
  );
}

export default SwitchNetwork