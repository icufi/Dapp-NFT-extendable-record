import React from 'react';
import { DialogContentText } from '@mui/material';

function EmailPrompt({ record, theme, descriptionElementRef }) {
  return (
    <DialogContentText
      id='scroll-dialog-description'
      ref={descriptionElementRef}
      tabIndex={-1}
      sx={{ mb: theme.spacing(2), mt: theme.spacing(4) }}
    >
      Send an email from your{' '}
      {record.attrNFTName.substring(0, record.attrNFTName.length - 13)}.
    </DialogContentText>
  );
}

export default EmailPrompt;
