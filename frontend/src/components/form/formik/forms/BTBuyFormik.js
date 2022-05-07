import React from 'react';
import { Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextFieldFormik from '../components/TextField';
import ButtonFormik from '../components/ButtonModal';
import LoadingSpinner from '../../../../shared/components/UIElements/LoadingSpinner';

import theme from '../../../../Styles';

const INITIAL_FORM_STATE = {
  tokenCount: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  tokenCount: Yup.number().required('Minimum token purchase is 1.'),
});

const BTBuyFormik = ({ chainId, onSubmitHandler, isLoading }) => {
  return (

    <>
      <h2 id='parent-modal-title'>Visible builds services for NFT owners</h2>
      <p id='parent-modal-description'>Owning a Builder Token NFT grants:</p>
      <ul>
        <li>access to all services</li>
        <li>services for any NFT in the same wallet</li>
        <li>services are available for both Ethereum and Polygon NFTs</li>
      </ul>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        initialTouched={{
          field: true,
        }}
        validateOnMount
        validationSchema={FORM_VALIDATION_SCHEMA}
        onSubmit={onSubmitHandler}
      >
        <Form>
          <Grid xs={12} item>
            <TextFieldFormik
              name='tokenCount'
              label='Cost 60 Matic per token'
            />
          </Grid>

          <Grid xs={12} item>
            {/* todo switch disable check to id 137 main polygon */}
            <ButtonFormik
              disabled={chainId === 80001 ? false : true}
              sx={{ mt: theme.spacing(2) }}
              fullWidth
            >
              Submit
            </ButtonFormik>
            {isLoading && (
              <Grid sx={{ ml: theme.spacing(3), mt: theme.spacing(1) }} item>
                <LoadingSpinner />
              </Grid>
            )}
          </Grid>
        </Form>
      </Formik>
    </>

  );
};

export default BTBuyFormik;
