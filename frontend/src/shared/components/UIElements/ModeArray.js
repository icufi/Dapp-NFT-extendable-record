import React, { useContext } from 'react';
import { Grid, Box, Button } from '@mui/material';
import SVG from 'react-inlinesvg';

import { AuthContext } from '../../../shared/context/auth-context.js';

import theme from '../../../Styles';

const styles = {
  record: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    boxShadow: '0 0 5px #999999',
  },
};

const ModeArray = ({record, tokenOwner, ...props }) => {
  const auth = useContext(AuthContext);

  // const classes = useStyles();

  return (
    <>
      {record.modeArray.map((mode) => (
        <Grid key={mode.modeName} sx={styles.record} item xs={12}>
          <Grid xs={12} md={6} item>
            <Box sx={styles.img}>
              <SVG
                src={mode.svg}
                alt='NFT Public Record'
                title={mode.modeName}
                uniquifyIDs={true}
              />
            </Box>
            <Box
              sx={{ mt: theme.spacing(1), mb: theme.spacing(18) }}
              textAlign='center'
            >
              <Button
                onClick={props.onSubmitMintRecord(mode)}
                variant='contained'
                size='large'
                fullWidth
                // todo change chainId test variable
                disabled={
                  (!tokenOwner && !auth.BTTokenCheck) || auth.chainId !== 80001
                }
              >
                Mint Record
              </Button>
            </Box>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default ModeArray;
