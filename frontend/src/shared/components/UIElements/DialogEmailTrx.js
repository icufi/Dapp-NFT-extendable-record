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
import * as Yup from 'yup';

import TextFieldFormik from '../../../components/form/formik/components/TextField';
import ButtonFormik from '../../../components/form/formik/components/ButtonFormik';
import { AuthContext } from '../../context/auth-context';
import LoadingSpinner from './LoadingSpinner';
import ScrollToTop from '../util/ScrollToTop';
import { useHttpClient } from '../../hooks/http-hook';

import theme from '../../../Styles';
import { Typography } from '@mui/material';

const INITIAL_FORM_STATE = {
  emailFrom: '',
  emailTo: '',
  subject: '',
  // emailReply: '',
  // message: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  emailFrom: Yup.string().required(
    'An email address of your choosing is required.'
  ),
  emailTo: Yup.string()
    .email('Email format is not valid.')
    .required('A mail to address is required.'),

  // emailReply: Yup.string().email('Email format is not valid.'),
  subject: Yup.string().max(
    100,
    'Please keep subject line to less than 100 characters.'
  ),
  // message: Yup.string().max(
  //   1000,
  //   'Please keep your message to less than 1000 characters.'
  // ),
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
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('body');
  const [timer, setTimer] = useState(false);
  const [response, setResponse] = useState('');
  const [emailSent, setEmailSent] = useState('');

  ScrollToTop();

  useEffect(() => {
    setTimeout(() => {
      setTimer(true);
    }, 600000);
  }, []);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <Box sx={{ width: '500px' }}>
          <DialogTitle xs={6} id='scroll-dialog-title'>
            Your mint is pending...
          </DialogTitle>

          {timer === true && !err && !receipt && (
            <Box
              sx={{
                ml: theme.spacing(3),
                mt: theme.spacing(1),
                color: 'green',
              }}
            >
              Timeout. This may be do to a network issue. If you have
              successfully minted a record, our system will automatically
              publish it. No further action required.
            </Box>
          )}
          {receipt && (
            <Box
              sx={{
                ml: theme.spacing(3),
                mt: theme.spacing(1),
                color: 'green',
              }}
            >
              Success! {record.nftTokenType} #{record.nftTokenId}'s new record
              is on-chain and unalterable.
            </Box>
          )}
          {err && (
            <Box
              sx={{
                mr: theme.spacing(3),
                ml: theme.spacing(3),
                mt: theme.spacing(1),
                color: 'red',
              }}
            >
              Error: {err.message}
            </Box>
          )}
          {!receipt && timer === false && !err && (
            <Box
              sx={{ mt: theme.spacing(2), pb: theme.spacing(2) }}
              xs={12}
              textAlign='center'
            >
              <LoadingSpinner />
              <Typography
                sx={{ mt: theme.spacing(3), padding: theme.spacing(2) }}
              >
                We recommend using 'aggressive' gas fees in Metamask and keeping
                this dialog box open until you receive a 'success' message.
              </Typography>
            </Box>
          )}
          <DialogActions>
            <Button onClick={props.onClose}>Close</Button>
          </DialogActions>
          <DialogContent dividers={scroll === 'paper'}>
            {!err && !receipt && !response && (
              <DialogContentText
                id='scroll-dialog-description'
                ref={descriptionElementRef}
                tabIndex={-1}
                sx={{ mb: theme.spacing(4) }}
              >
                Send an email from{' '}
                {record.attrNFTName.substring(
                  0,
                  record.attrNFTName.length - 13
                )}{' '}
                while you wait.
              </DialogContentText>
            )}
            {receipt && !response && (
              <DialogContentText
                id='scroll-dialog-description'
                ref={descriptionElementRef}
                tabIndex={-1}
                sx={{ mb: theme.spacing(4) }}
              >
                Send an email from{' '}
                {record.attrNFTName.substring(
                  0,
                  record.attrNFTName.length - 13
                )}{' '}
                now.
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
                          @publicrecord.cc
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
                {!err && (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        color: 'blue',
                        fontSize: '16px',
                      }}
                    >
                      {record.nftTokenType} {record.nftTokenId}'s new public
                      record will be included in the email body.
                    </Box>
                  </Grid>
                )}
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
