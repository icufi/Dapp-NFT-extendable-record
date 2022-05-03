import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

import TextFieldFormik from '../../../components/form/formik/components/TextField';
import ButtonFormik from '../../../components/form/formik/components/ButtonFormik';
import { AuthContext } from '../../context/auth-context';
import LoadingSpinner from './LoadingSpinner';
import ScrollToTop from '../util/ScrollToTop';
import { useHttpClient } from '../../hooks/http-hook';
import Success from '../FormElements/Success';
import TrxError from '../FormElements/TrxError';
import TimeoutDialog from '../FormElements/TimeoutDialog';
import TrxSpinner from '../FormElements/TrxSpinner';

import theme from '../../../Styles';

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

export default function DialogEmailTrx({
  err,
  record,
  receipt,
  owner,
  mintedObject,
  ...props
}) {
  const auth = useContext(AuthContext);
  const [timer, setTimer] = useState(false);
  const [response, setResponse] = useState('');
  const [emailSent, setEmailSent] = useState('');

  const scroll = 'body';

  ScrollToTop();

  useEffect(() => {
    setTimeout(() => {
      setTimer(true);
    }, 600000);
  }, []);

  const descriptionElementRef = React.useRef(null);
  // React.useEffect(() => {
  //   if (open) {
  //     const { current: descriptionElement } = descriptionElementRef;
  //     if (descriptionElement !== null) {
  //       descriptionElement.focus();
  //     }
  //   }
  // }, []);

  const { sendRequest, isLoading, error } = useHttpClient();

  const onSubmitHandler = async (event) => {
    auth.detect();
    console.log('record at send email dialog:', mintedObject);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/sendMail`,
        'POST',
        JSON.stringify({
          emailFrom: event.emailFrom,
          emailTo: event.emailTo,
          emailReply: event.emailReply,
          subject: event.subject,
          message: event.message,
          attrNFTName: mintedObject.attrNFTName,
          nftTokenType: mintedObject.nftTokenType,
          nftTokenId: mintedObject.nftTokenId,
          dna: mintedObject.dna,

          userAddress: auth.currentAccount,

          image: mintedObject.image,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      setResponse(response);
      setEmailSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        {...props}
        open={props.open}
        onClose={props.onClose}
        scroll='body'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <Box sx={{ width: '500px' }}>
          {receipt ? (
            <DialogTitle xs={6} id='scroll-dialog-title'>
              Your mint is complete.
            </DialogTitle>
          ) : (
            <DialogTitle xs={6} id='scroll-dialog-title'>
              Your mint is pending...
            </DialogTitle>
          )}

          {timer === true && !err && !receipt && <TimeoutDialog theme={theme} />}
          {receipt && <Success record={record} theme={theme} />}
          {err && <TrxError err={err} theme={theme} />}
          {!receipt && timer === false && !err && <TrxSpinner theme={theme}/>}
          <DialogContent dividers={scroll === 'paper'}>
            {!err && !receipt && !response && (
              <DialogContentText
                id='scroll-dialog-description'
                ref={descriptionElementRef}
                tabIndex={-1}
                sx={{ mb: theme.spacing(4) }}
              >
                Send an email from your{' '}
                {record.attrNFTName.substring(
                  0,
                  record.attrNFTName.length - 13
                )}{' '}
                while you wait.
              </DialogContentText>
            )}
            {receipt && response && (
              <DialogContentText
                id='scroll-dialog-description'
                ref={descriptionElementRef}
                tabIndex={-1}
                sx={{ mb: theme.spacing(4) }}
              >
                Send an email from your{' '}
                {record.attrNFTName.substring(
                  0,
                  record.attrNFTName.length - 13
                )}{' '}.
              </DialogContentText>
            )}
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION_SCHEMA}
              onSubmit={onSubmitHandler}
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
                        <TextFieldFormik
                          name='subject'
                          label='Subject (optional)'
                        />
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
                        onClick={onSubmitHandler}
                        response={response ? true : false}
                        emailSent={emailSent ? true : false}
                      >
                        Send
                      </ButtonFormik>
                    </React.Fragment>
                  )}
                  {response && <Button onClick={props.onClose}>Close</Button>}
                  {err && !response && (
                    <Button onClick={props.onClose}>Close</Button>
                  )}
                </DialogActions>
              </Form>
            </Formik>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}
