import React, { useEffect, useState } from 'react';

import PendingComplete from '../UIElements/PendingComplete';
import TimeoutDialog from './TimeoutDialog';
import Success from './Success';
import TrxError from './TrxError';
import TrxSpinner from './TrxSpinner';
import EmailPrompt from './EmailPrompt';

const EmailDialog = ({
  receipt,
  err,
  record,
  theme,
  descriptionElementRef,
}) => {
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimer(true);
    }, 600000);
  }, []);

  return (
    <>
      <PendingComplete receipt={receipt} />
      {timer && !err && !receipt && <TimeoutDialog theme={theme} />}
      {receipt && <Success record={record} theme={theme} />}
      {err && <TrxError err={err} theme={theme} />}
      {!receipt && !timer && !err && <TrxSpinner theme={theme} />}
      {!err && <EmailPrompt
        theme={theme}
        record={record}
        descriptionElementRef={descriptionElementRef}
      />}
    </>
  );
};

export default EmailDialog;
