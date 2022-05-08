import React, { useState, useContext } from 'react';
import { Container, Grid} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextFieldFormik from './formik/components/TextField';
import SelectFieldFormik from './formik/components/SelectField';
import supportedNFTProjects from '../../assets/supportedNFTProjects.json';
import ButtonControlled from './formik/components/ButtonControlled';

import { AuthContext } from '../../shared/context/auth-context';
import ModalSugProject from './formik/forms/SugProjectFormik';
import OpenModalText from '../../shared/components/FormElements/OpenModalText';
import ConnectWalletText from '../../shared/components/UIElements/ConnectWalletText';
import ModalForms from './formik/components/ModalForms';

const INITIAL_FORM_STATE = {
  // todo delete test input below
  nftTokenType: 'BAYC',
  // todo delete test input below
  nftTokenId: '1',
  message: '',
  attrKeyword: '',
  emailTo: '',
  emailReply: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  nftTokenType: Yup.string().required('(required).'),
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
              <OpenModalText
                children='suggest an NFT project'
                color='blue'
                align='right'
                handleOpen={handleOpen}
              />
            </Grid>
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
              <ButtonControlled children='Generate Image Preview' />
            </Grid>
            {!auth.provider.selectedAddress && (
              <ConnectWalletText
                children='connect wallet to preview'
                color='blue'
                align='center'
                checkWallet={auth.checkWalletIsConnected}
              />
            )}
            <ModalForms open={open} onClose={handleClose}>
              <ModalSugProject />
            </ModalForms>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default SendFormik;
