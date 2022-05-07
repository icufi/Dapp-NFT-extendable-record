import React from 'react';
import { Modal, Backdrop, Fade } from '@mui/material';

const ModalForms = (props) => {
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
