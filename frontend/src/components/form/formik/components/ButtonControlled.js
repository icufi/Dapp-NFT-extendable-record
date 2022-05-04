import React, {useContext} from 'react';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import {AuthContext} from '../../../../shared/context/auth-context';


const ButtonControlled = ({emailSent, response, err, email, children, ...otherProps }) => {
  const { submitForm } = useFormikContext();
  const auth = useContext(AuthContext)

  const handleSubmit = () => {
    submitForm();
  };

  let configButton;
  if (email) {
    configButton = {
      ...otherProps,
      onClick: handleSubmit,
    };
  } else {
    configButton = {
      ...otherProps,
      variant: 'contained',
      color: 'primary',
      fullWidth: true,
      onClick: handleSubmit,
    };
  }

  return <Button disabled={err || response || !auth.currentAccount || emailSent} {...configButton}>{children}</Button>;
};

export default ButtonControlled;
