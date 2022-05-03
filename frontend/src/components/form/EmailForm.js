import React from 'react'
import { Grid, Box, Typography, DialogActions, Button} from '@mui/material'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'


import TextFieldFormik from './formik/components/TextField'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ButtonFormik from './formik/components/ButtonFormik'

const INITIAL_FORM_STATE = {
  emailFrom: '',
  emailTo: '',
  subject: '',
  emailReply: '',
  message: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  emailFrom: Yup.string().required(
    'An email address of your choosing is required.'
  ),
  emailTo: Yup.string()
    .email('Email format is not valid.')
    .required('A mail to address is required.'),

  emailReply: Yup.string().email('Email format is not valid.'),
  subject: Yup.string().max(
    100,
    'Please keep subject line to less than 100 characters.'
  ),
  message: Yup.string().max(
    1000,
    'Please keep your message to less than 1000 characters.'
  ),
});



const EmailForm = ({record, response, isLoading, err, error, emailSent, ...props}) => {


  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION_SCHEMA}
      onSubmit={props.submitEmailHandler}
    >
      <Form>
        <Grid container spacing={2}>
          {!response && !error && (
            <React.Fragment>
              <Grid item xs={6}>
                <Box sx={{ fontSize: '12px' }}>email address from</Box>
                <TextFieldFormik
                  name='emailFrom'
                  label={`ex:  ${record.nftTokenType}${record.nftTokenId}`}
                />
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    color: '#808080',
                    pt: '43px',
                    fontSize: { xs: '16px', md: '34px' },
                  }}
                >
                  @visible.love
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ fontSize: '12px' }}>email address to</Box>
                <TextFieldFormik name='emailTo' label={`recipient`} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ fontSize: '12px' }}>email address reply</Box>
                <TextFieldFormik
                  name='emailReply'
                  label='Your real email address (optional)'
                />
              </Grid>

              <Grid item xs={12}>
                <TextFieldFormik name='subject' label='Subject (optional)' />
              </Grid>

              <Grid item xs={12}>
                <TextFieldFormik
                  name='message'
                  label='Message (optional)'
                  multiline={true}
                  rows={8}
                />
              </Grid>
            </React.Fragment>
          )}
          {isLoading && (
            <Grid>
              <LoadingSpinner />
            </Grid>
          )}
          {response && (
            <Grid sx={{ width: '600px' }} item>
              <Typography>{response.msg}</Typography>
            </Grid>
          )}
        </Grid>
        <DialogActions>
          {!response && !err && (
            <React.Fragment>
              <Button onClick={props.onClose}>Close</Button>
              <ButtonFormik
                err={err ? true : false}
                email
                onClick={() => props.onSubmitHandler()}
                response={response ? true : false}
                emailSent={emailSent ? true : false}
              >
                Send
              </ButtonFormik>
            </React.Fragment>
          )}
          {response && <Button onClick={props.onClose}>Close</Button>}
          {err && !response && <Button onClick={props.onClose}>Close</Button>}
        </DialogActions>
      </Form>
    </Formik>
  );
}

export default EmailForm