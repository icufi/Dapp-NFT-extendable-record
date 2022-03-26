import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const DateTimePicker = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = meta.error;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker}></TextField>;
};

export default DateTimePicker;
