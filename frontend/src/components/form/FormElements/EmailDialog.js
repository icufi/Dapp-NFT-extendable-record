import React, { useEffect, useState } from 'react';

import PendingComplete from '../../../shared/components/UIElements/PendingComplete';
import TimeoutDialog from './TimeoutDialog';
import Success from './Success';
import TrxError from './TrxError';
import TrxSpinner from './TrxSpinner';

const EmailDialog = ({
  receipt,
  err,
  record,
  theme,
}) => {
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimer(true);
    }, 600000);
  }, []);

  return (
    <>
      <PendingComplete err={err} receipt={receipt} />
      {timer && !err && !receipt && <TimeoutDialog theme={theme} />}
      {receipt && <Success record={record} theme={theme} />}
      {err && <TrxError err={err} theme={theme} />}
      {!receipt && !timer && !err && <TrxSpinner theme={theme} />}
    </>
  );
};

export default EmailDialog;
