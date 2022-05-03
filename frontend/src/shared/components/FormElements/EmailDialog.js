import React from 'react';

import PendingComplete from '../UIElements/PendingComplete';
import TimeoutDialog from './TimeoutDialog';
import Success from './Success';
import TrxError from './TrxError';
import TrxSpinner from './TrxSpinner';
import EmailPrompt from './EmailPrompt';

const EmailDialog = ({
  receipt,
  timer,
  err,
  record,
  theme,
  descriptionElementRef,
}) => {
  return (
    <>
      <PendingComplete receipt={receipt} />
      {timer === true && !err && !receipt && <TimeoutDialog theme={theme} />}
      {receipt && <Success record={record} theme={theme} />}
      {err && <TrxError err={err} theme={theme} />}
      {!receipt && timer === false && !err && <TrxSpinner theme={theme} />}
      <EmailPrompt
        theme={theme}
        record={record}
        descriptionElementRef={descriptionElementRef}
      />
    </>
  );
};

export default EmailDialog;
