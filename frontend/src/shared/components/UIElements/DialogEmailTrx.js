import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

import { AuthContext } from '../../context/auth-context';
import ScrollToTop from '../util/ScrollToTop';
import { useHttpClient } from '../../hooks/http-hook';
import EmailForm from '../../../components/form/EmailForm';
import EmailDialog from '../FormElements/EmailDialog';

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
  const [timer, setTimer] = useState(false);
  const [response, setResponse] = useState('');
  const [emailSent, setEmailSent] = useState('');

  const scroll = 'body';

  ScrollToTop();

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
          <DialogContent dividers={scroll === 'paper'}>
            <EmailDialog
              receipt={receipt}
              err={err}
              timer={timer}
              record={record}
              theme={theme}
              descriptionElementRef={descriptionElementRef}
            />
            <EmailForm
                submitEmailHandler={submitEmailHandler}
                error={error}
                isLoading={isLoading}
                response={response}
                emailSent={emailSent}
                record={record}
                err={err}
                {...props}
              />
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}
