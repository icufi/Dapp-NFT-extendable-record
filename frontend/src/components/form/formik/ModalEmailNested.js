import * as React from 'react';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Web3 from 'web3';

import TextFieldFormik from '../../../components/form/formik/components/TextField';
import ButtonFormik from '../../../components/form/formik/components/ButtonFormik';
import { AuthContext } from '../../context/auth-context';
import BuilderTokensBuild from '../../../assets/contracts/BuilderTokens.json';

import Checkbox from '../../../components/form/formik/components/Checkbox';
import ScrollToTop from '../util/ScrollToTop';

import theme from '../../../Styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '6px',
  overflow: 'scroll',
};

const INITIAL_FORM_STATE = {
  emailFrom: '',
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  includeRecord: false,
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  tokenCount: Yup.number().required('Minimum token purchase is 1.'),
});

function ChildModal(props) {
  return (
    <React.Fragment>
      <Modal
        hideBackdrop
        {...props}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id='child-modal-title'>Why Polygon?</h2>
          <p id='child-modal-description'></p>
          <ul>
            <li>Polygon is a popular Ethereum Layer2 solution.</li>
            <li>Polygon operates exactly like Ethereum.</li>
            <li>Gas fees are pennies per transaction.</li>
            <li>Low gas fees means we can build more useful services.</li>
            <li>Polygon NFTs are traded on Opensea and elsewhere.</li>
            <li>
              Added level of security for your Ethereum NFT's because all
              transactions are conducted on Polygon network.
            </li>
          </ul>

          <Box textAlign='center'>
            <Button variant='contained' onClick={props.onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ModalEmailNested({ record, loading, receipt, owner, ...props }) {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [trxSuccess, setTrxSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  ScrollToTop();

  console.log('modal chain id:', auth.chainId);
 console.log('loading:', loading)
 console.log('receipt :', receipt)
 console.log('record:', record)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const chainIdHandler = () => {
    auth.detect();
  };

  const onSubmitHandler = async (event) => {
    setIsLoading(true);
    setTrxSuccess(false);
    setError('');
    const web3 = new Web3(auth.provider);
    const networkId = await web3.eth.net.getId();

    const iconMint = new web3.eth.Contract(
      BuilderTokensBuild.abi,
      BuilderTokensBuild.networks[networkId].address
    );



    const value = event.tokenCount * 6;

    const payment = web3.utils.toWei(value.toString(), 'ether');

    try {
      await iconMint.methods
        .mint(event.tokenCount)
        .send({
          from: auth.provider.selectedAddress,
          value: payment,
        })

        .then(function (receipt) {
          setIsLoading(false);
          setTrxSuccess(true);
          owner(true);
          console.log(receipt);
        });
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
      setError(err.message);
    }

    event.quantity = '';
  };

  return (
    <div>
      <Modal
        {...props}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 600 }}>
          <h2 id='parent-modal-title'>While your mint is pending...</h2>
          <p id='parent-modal-description'></p>

          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION_SCHEMA}
            onSubmit={onSubmitHandler}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    Send an email as the verified owner of {record.nftTokenType} #
                    {record.nftTokenId}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextFieldFormik
                    name='emailfrom'
                    label={`ex: ${record.nftTokenType}#${record.nftTokenId}@visible.love`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldFormik name='firstName' label='First Name (optional)' />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldFormik name='lastName' label='Last Name (optional)' />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldFormik name='emailReply' label='your reply email address (optional)' />
                </Grid>
                <Grid xs={12} item>
                  <Checkbox
                  name='includeRecord'
                  legend={`Include your NFT's new Public Record?`}
                  label='include record'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldFormik
                    name='message'
                    label='Message (optional)'
                    multiline={true}
                    rows={6}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ButtonFormik>Submit Mail</ButtonFormik>
                </Grid>
              </Grid>
            </Form>
          </Formik>
          <ChildModal open={open} onClose={handleClose} />
          <Box
            display='flex'
            justifyContent='space-between'
            marginTop={theme.spacing(50)}
          >
            <Button
              onClick={props.onClose}
              sx={{
                cursor: 'pointer',
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
