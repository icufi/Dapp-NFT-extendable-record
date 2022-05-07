import * as React from 'react';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextFieldFormik from '../components/TextField';
import ButtonModal from '../components/ButtonModal';
import { useHttpClient } from '../../../../shared/hooks/http-hook';

import theme from '../../../../Styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
};

const INITIAL_FORM_STATE = {
  featureSuggestion: '',
  email: ''
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  featureSuggestion: Yup.string().required().max(200, 'Please keep suggestion to less than 200 characters.').min(3),
  email: Yup.string().email('Email is invalid'),

});

export default function TransitionsModal(props) {
  const { sendRequest } = useHttpClient();

  const onSubmitHandler = async (event) => {
    console.log(event);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/suggestion`,
        'POST',
        JSON.stringify({
          featureSuggestion: event.featureSuggestion,
          email: event.email,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
          <Box sx={style}>
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
                <TextFieldFormik
                  name='email'
                  label='Reply email address (optional)'
                />
                <TextFieldFormik
                  sx={{ mt: theme.spacing(2) }}
                  name='featureSuggestion'
                  label='Suggest a feature (200 char max)'
                  multiline={true}
                  rows={5}
                />
                <ButtonModal
                  onClose={props.onClose}
                  sx={{ mt: theme.spacing(2) }}
                >
                  Submit
                </ButtonModal>
              </Form>
            </Formik>
          </Box>
  );
}
