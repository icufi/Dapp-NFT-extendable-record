import React from 'react'
import {Grid} from '@mui/material'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'

import TextFieldFormik from './formik/components/TextField';
import ButtonFormik from './formik/components/ButtonModal';

import theme from '../../Styles'

const INITIAL_FORM_STATE = {
  tokenCount: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  tokenCount: Yup.number().required('Minimum token purchase is 1.'),
});

const BTBuyForm = ({chainId, onSubmitHandler}) => {


  return (
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
          <TextFieldFormik name='tokenCount' label='Cost 60 Matic per token' />
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
        </Grid>
      </Form>
    </Formik>
  );
}

export default BTBuyForm