import React, { useState, useContext } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextFieldFormik from './components/TextField';
import SelectFieldFormik from './components/SelectField';
import supportedNFTProjects from '../../../assets/supportedNFTProjects.json';
import ButtonFormik from './components/ButtonFormik';


import { AuthContext } from '../../../shared/context/auth-context';
import ModalSugProject from '../formik/ModalSugFeature';



const INITIAL_FORM_STATE = {
  nftTokenType: '',
  nftTokenId: '',
  message: '',
  attrKeyword: '',
  emailTo: '',
  emailReply: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  nftTokenType: Yup.string().required(
    '(required).'
  ),
  nftTokenId: Yup.number()
    .required('A token Id number is required.')
    .integer()
    .lessThan(10000)
    .typeError('Only numeric digits, no letters or special characters.'),
  message: Yup.string().max(
    200,
    'On chain messages can be a maximum of 200 characters.'
  ),
  attrKeyword: Yup.string().max(
    20,
    'On chain keywords can be a maximum of 20 characters.'
  ),
  emailTo: Yup.string().email('Email is invalid'),
  emailReply: Yup.string().email('Email is invalid'),
});

const SendFormik = (props) => {

  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Container>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION_SCHEMA}
        onSubmit={props.onSubmit}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SelectFieldFormik
                name='nftTokenType'
                label='Choose a NFT Project'
                options={supportedNFTProjects}
              />
            </Grid>
            <Grid xs={12} item>
              <Typography
                align='right'
                sx={{
                  color: 'blue',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
                onClick={handleOpen}
              >
                suggest an NFT project
              </Typography>
            </Grid>
            <ModalSugProject open={open} onClose={handleClose} />
            <Grid item xs={12}>
              <TextFieldFormik
                name='nftTokenId'
                label='NFT/Token number you own'
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldFormik
                name='message'
                label='on-chain message (200 chars max, optional).'
                multiline={true}
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldFormik
                name='attrKeyword'
                label='on-chain keyword (20 chars max, optional).'
              />
            </Grid>

            <Grid item xs={12}>
              <ButtonFormik>Generate Image Preview</ButtonFormik>
            </Grid>
            {!auth.provider.selectedAddress && (
              <Grid xs={12} item>
                <Typography
                  align='center'
                  sx={{
                    color: 'blue',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                  onClick={auth.checkWalletIsConnected}
                >
                  connect wallet to preview
                </Typography>
              </Grid>
            )}
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default SendFormik;
