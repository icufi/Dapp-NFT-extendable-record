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

import TextFieldFormik from './components/TextField';
import ButtonModalBTBuy from './components/ButtonModalBTBuy';
import { AuthContext } from '../../../shared/context/auth-context';
import BuilderTokensBuild from '../../../assets/contracts/BuilderTokens.json';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

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
};

const INITIAL_FORM_STATE = {
  tokenCount: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  tokenCount: Yup.number().required('Minimum token purchase is 1.'),
});

export default function NestedModal({ owner, ...props }) {
  const auth = useContext(AuthContext);
  const [trxSuccess, setTrxSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmitHandler = async (event) => {
    setIsLoading(true);
    const web3 = new Web3(auth.provider);
    const networkId = await web3.eth.net.getId();
    const iconMint = new web3.eth.Contract(
      BuilderTokensBuild.abi,
      BuilderTokensBuild.networks[networkId].address
    );


    const value = event.tokenCount * 60;
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
          <h2 id='parent-modal-title'>Visible builds services for NFT owners</h2>
          <p id='parent-modal-description'>
            Owning a Builder Token NFT grants:
          </p>
          <ul>
            <li>access to all services</li>
            <li>services for any NFT in the same wallet</li>
            <li>services are available for both Ethereum and Polygon NFTs</li>
          </ul>

          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            initialTouched={{
              field: true,
            }}
            validateOnMount
            validationSchema={FORM_VALIDATION_SCHEMA}
            onSubmit={onSubmitHandler}
          >
            <Form>
              <Grid container>
                <Grid xs={12} item>
                  <TextFieldFormik
                    name='tokenCount'
                    label='Cost 60 Matic per token'
                  />
                </Grid>

                <Grid xs={3} item>
                  {/* todo switch disable check to id 137 main polygon */}
                  <ButtonModalBTBuy
                    disabled={auth.chainId === 137 ? false : true}
                    sx={{ mt: theme.spacing(2) }}
                  >
                    Submit
                  </ButtonModalBTBuy>
                </Grid>

                {isLoading && (
                  <Grid
                    sx={{ ml: theme.spacing(3), mt: theme.spacing(1) }}
                    item
                  >
                    <LoadingSpinner />
                  </Grid>
                )}

                {error && (
                  <Grid
                    xs={12}
                    sx={{
                      paddingTop: theme.spacing(2),
                    }}
                    item
                  >
                    <Typography variant='h7' sx={{ color: 'red' }}>
                      {error}
                    </Typography>
                  </Grid>
                )}
                {auth.chainId !== 137 && (
                  <Grid
                    xs={12}
                    sx={{
                      paddingTop: theme.spacing(2),
                    }}
                    item
                  >
                    <Typography variant='h7' sx={{ color: 'red' }}>
                      Switch Metamask to Polygon Mainnet to complete
                      transaction.
                    </Typography>
                    <Box

                      sx={{
                        fontSize: '14px',
                        cursor: 'pointer',
                        color: 'blue',
                      }}
                    >
                      <ul>
                        <li>Why Polygon?</li>
                        <li>
                          <a
                            href='https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
                            target='blank'
                          >
                            Set up Metamask for Polygon
                          </a>
                        </li>
                        <li>
                          <a
                            href='https://consensys.net/blog/metamask/how-to-bridge-tokens-from-ethereum-to-polygon-with-metamask/'
                            target='blank'
                          >
                            Bridge Ethereum to Polygon
                          </a>
                        </li>
                      </ul>
                    </Box>
                  </Grid>
                )}
                {trxSuccess && (
                  <Grid
                    xs={9}
                    sx={{
                      pt: theme.spacing(3),
                      pl: theme.spacing(3),
                    }}
                    item
                  >
                    <Typography sx={{ fontSize: '18px', color: 'green' }}>
                      Success! Builder Token minted.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Form>
          </Formik>
          <Box
            display='flex'
            justifyContent='flex-end'
            marginTop={theme.spacing(10)}
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
