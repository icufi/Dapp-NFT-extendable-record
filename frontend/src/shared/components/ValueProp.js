import React, { useContext, useState } from 'react';
import { Grid, Container, Box } from '@mui/material';

import GenRecord from '../../components/form/GenRecord';
import { useHttpClient } from '../hooks/http-hook';
import MintRecord from '../../pages/MintRecord';
import LoadingSpinner from './UIElements/LoadingSpinner';
import ErrorModal from './UIElements/ErrorModal';
import { AuthContext } from '../context/auth-context';
import Title from './UIElements/Title';
import HowItWorks from './UIElements/HowItWorks';

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
  root: {
    pt: { md: theme.spacing(12), xs: theme.spacing(8) },
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
    <Container sx={styles.root}>
      <Grid container>
        <Title />
        <HowItWorks />
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
