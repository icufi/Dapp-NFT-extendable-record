import React, { useContext, useState } from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import GenRecord from '../../components/form/GenRecord';
import { useHttpClient } from '../hooks/http-hook';
import MintRecord from '../../pages/MintRecord';
import LoadingSpinner from './UIElements/LoadingSpinner';
import ErrorModal from './UIElements/ErrorModal';
import { AuthContext } from '../context/auth-context';

import theme from '../../Styles';

const styles = {
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
};

const ValueProp = (props) => {
  const auth = useContext(AuthContext);
  const [response, setResponse] = useState({});

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const onSubmitHandler = async (event) => {
    auth.detect();
    try {
      const response = await sendRequest(
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
          <Box sx={styles.loading}>
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
          sx={styles.body}
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
