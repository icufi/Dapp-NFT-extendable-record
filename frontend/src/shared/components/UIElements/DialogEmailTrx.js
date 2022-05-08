import * as React from 'react';
import { useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { AuthContext } from '../../context/auth-context';
import ScrollToTop from '../util/ScrollToTop';
import { useHttpClient } from '../../hooks/http-hook';
import EmailForm from '../../../components/form/EmailForm';
import EmailDialog from '../../../components/form/FormElements/EmailDialog';

import theme from '../../../Styles';

export default function DialogEmailTrx({
  err,
  record,
  receipt,
  owner,
  mintedObject,
  ...props
}) {
  const auth = useContext(AuthContext);
  const [response, setResponse] = useState('');
  const [emailSent, setEmailSent] = useState('');


  ScrollToTop();

  const descriptionElementRef = React.useRef(null);

  const { sendRequest, isLoading, errorHTTP } = useHttpClient();

  const submitEmailHandler = async (event) => {
    auth.detect();
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
          <DialogContent dividers={'body' === 'paper'}>
            <EmailDialog
              receipt={receipt}
              err={err}
              record={record}
              theme={theme}
            />
            {!err && (
              <EmailForm
                submitEmailHandler={submitEmailHandler}
                errorHTTP={errorHTTP}
                isLoading={isLoading}
                response={response}
                emailSent={emailSent}
                record={record}
                err={err}
                theme={theme}
                descriptionElementRef={descriptionElementRef}
                {...props}
              />
            )}

            {err && (
              <Grid container justifyContent='flex-end'>
                <Button onClick={props.onClose}>Close</Button>
              </Grid>
            )}
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}
