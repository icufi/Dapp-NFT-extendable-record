import React, { useContext } from 'react';
import { Modal, Button, Box, Backdrop, Grid, Fade } from '@mui/material';

import { AuthContext } from '../../../../shared/context/auth-context';

import theme from '../../../../Styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
};

const ModalForms = (props) => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <Modal
        {...props}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div>{props.children}</div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalForms;
