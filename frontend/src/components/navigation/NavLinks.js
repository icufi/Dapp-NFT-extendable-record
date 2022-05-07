import React, { useContext, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { AuthContext } from '../../shared/context/auth-context';
import ModalSugFeature from '../form/formik/forms/SugFeatureFormik';
import ModalForms from '../form/formik/components/ModalForms'
import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ul className='nav-links'>
      {auth.provider.selectedAddress ? (
        <li>
          <Box
            display='flex'
            justifyContent='flex-end'
            sx={{ pb: '3px', pr: '2px' }}
          >
            <Typography sx={{ fontSize: '9px' }}>wallet connected</Typography>
          </Box>

          <Button
            sx={{ color: '#BF40BF' }}
            variant='text'
            size='small'
            onClick={handleOpen}
          >
            suggest a feature
          </Button>
        </li>
      ) : (
        <li>
          <Button
            sx={{ color: '#BF40BF' }}
            variant='text'
            size='small'
            onClick={auth.checkWalletIsConnected}
          >
            Connect Wallet
          </Button>
        </li>
      )}
      <ModalForms open={open} onClose={handleClose}>
        <ModalSugFeature />
      </ModalForms>
    </ul>
  );
};

export default NavLinks;
