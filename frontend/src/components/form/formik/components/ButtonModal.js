import React from 'react';
import { Button, Box } from '@mui/material';
import { useFormikContext } from 'formik';

const ButtonFormik = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
    otherProps.onClose();
  };

  const configButton = {
    ...otherProps,
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    onClick: handleSubmit,
  };

  return (
    <Box display='flex' justifyContent='flex-start'>
      <Button {...configButton}>{children}</Button>
    </Box>
  );
};

export default ButtonFormik;
