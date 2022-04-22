import React, { useContext, useState } from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

import GenRecord from './form/formik/GenRecord';
import { useHttpClient } from '../shared/hooks/http-hook';
import MintRecord from '../pages/MintRecord';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../shared/context/auth-context';

import theme from '../Styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: { md: theme.spacing(12), xs: theme.spacing(50) },
    paddingBottom: theme.spacing(8),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
  },
  body: {
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(8),
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
  },
}));

const ValueProp = (props) => {
  const auth = useContext(AuthContext);
  const [response, setResponse] = useState({});
  const classes = useStyles(props);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  console.log('error:', error);

  const onSubmitHandler = async (event) => {
    auth.detect();
    try {
      const response = await sendRequest(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_BACKEND_URL}/users/initRecord`,
        'POST',
        JSON.stringify({
          user: auth.provider.selectedAddress,
          nftTokenType: event.nftTokenType,
          nftTokenId: event.nftTokenId,
          message: event.message,
          attrKeyword: event.attrKeyword,
          emailTo: event.emailTo,
          emailReply: event.emailReply,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      setResponse(response);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.loading}>
            <LoadingSpinner />
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return <ErrorModal error={error} onClear={clearError} />;
  }

  if (response.code === 201) {
    return <MintRecord record={response} />;
  }

  return (
    <Container sx={{ pt: { md: theme.spacing(12), xs: theme.spacing(8) } }}>
      <Grid container>
        <Grid
          item
          sx={{ mb: { md: theme.spacing(10), xs: theme.spacing(1) } }}
          xs={12}
        >
          <Typography
            align='center'
            variant='h1'
            sx={{ fontSize: { md: '48px' } }}
          >
            <strong>Create Visible Records For Your NFT</strong>
          </Typography>
          <Box sx={{ fontSize: '16px' }} textAlign={'center'}>
            artists get 50% revenue share:{' '}
            <Link
              to='/mode'
            >
              learn more
            </Link>
          </Box>
        </Grid>
        <Grid
          sx={{ padding: theme.spacing(2) }}
          xs={12}
          md={6}
          order={{ xs: 2, sm: 2, md: 1 }}
          item
        >
          <Grid item>
            <Box textAlign='center'>
              <Typography variant='h2'>How it works</Typography>
              <Typography>1. connect your Metamask</Typography>
              <Typography sx={{ pt: theme.spacing(4) }}>
                2. select an NFT project you own
              </Typography>
              <Typography sx={{ pt: theme.spacing(4) }}>
                3. enter token number you own
              </Typography>
              <Typography sx={{ pt: theme.spacing(4) }}>
                4. enter optional message/keyword
              </Typography>
              <Typography sx={{ pt: theme.spacing(4) }}>
                5. view a preview image
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid
          className={classes.body}
          xs={12}
          md={6}
          order={{ xs: 1, sm: 1, md: 2 }}
          item
        >
          <GenRecord onSubmit={onSubmitHandler} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ValueProp;
