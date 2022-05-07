import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Formik, Form } from 'formik';

import TextFieldFormik from '../components/TextField';
import ButtonModal from '../components/ButtonModal';
import { useHttpClient } from '../../../../shared/hooks/http-hook';
import * as Yup from 'yup';

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

const INITIAL_FORM_STATE = {
  nftProject: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  nftProject: Yup.string()
    .required()
    .max(60, 'Please keep suggestion to less than 60 characters.')
    .min(3),
});

export default function TransitionsModal(props) {
  const { sendRequest } = useHttpClient();

  const onSubmitHandler = async (event) => {
    console.log(event);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/suggestion`,
        'POST',
        JSON.stringify({
          nftProject: event.nftProject,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        {...props}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION_SCHEMA}
              onSubmit={onSubmitHandler}
            >
              <Form>
                <TextFieldFormik
                  name='nftProject'
                  label='Suggest an NFT project'
                />
                <ButtonModal
                  onClose={props.onClose}
                  sx={{ mt: theme.spacing(2) }}
                >
                  Submit
                </ButtonModal>
              </Form>
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
