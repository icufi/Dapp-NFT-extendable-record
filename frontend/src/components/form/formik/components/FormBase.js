import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextFieldFormik from './components/TextField';
import SelectField from './components/SelectField';
import countries from '../../../data/countries.json';
import DateTimePicker from './components/DateTimePicker';
import CheckboxGrid from './components/Checkbox';
import ButtonFormik from './components/Button';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
}));

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  arrivalDate: '',
  departureDate: '',
  message: '',
  termsOfService: false,
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Email is invalid').required('Required'),
  phone: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number.')
    .required('Required'),
  addressLine1: Yup.string().required('Required'),
  addressLine2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  arrivalDate: Yup.date().required('Required'),
  departureDate: Yup.date().required('Required'),
  message: Yup.string(),
  termsOfService: Yup.boolean()
    .oneOf([true], 'Terms and conditions must be accepted.')
    .required('Terms and conditions must be accepted.'),
});

const SendFormikGrid = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container>
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION_SCHEMA}
              onSubmit={(values) => console.log(values)}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Your Details</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <TextFieldFormik name='firstName' label='First Name' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldFormik name='lastName' label='Last Name' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldFormik name='email' label='Email' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldFormik name='phone' label='Phone' />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>Address</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextFieldFormik
                      name='addressLine1'
                      label='Address Line 1'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldFormik
                      name='addressLine2'
                      label='Address Line 2'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldFormik name='city' label='City' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldFormik name='state' label='State' />
                  </Grid>
                  <Grid item xs={12}>
                    <SelectField
                      name='country'
                      label='Country'
                      options={countries}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Booking Information</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker name='arrivalDate' label='Arrival Date' />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      name='departureDate'
                      label='Departure Date'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldFormik
                      name='message'
                      label='Message'
                      multiline={true}
                      rows={6}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CheckboxGrid
                      name='termsOfService'
                      legend='Terms Of Service'
                      label='I agree'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonFormik>Submit Form</ButtonFormik>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SendFormikGrid;
