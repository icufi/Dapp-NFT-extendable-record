import * as React from 'react';
import { useContext, useState } from 'react';
import {Grid, Box, Button} from '@mui/material';
import Web3 from 'web3';

import { AuthContext } from '../../../../shared/context/auth-context';
import BuilderTokensBuild from '../../../../assets/contracts/BuilderTokens.json';
import LoadingSpinner from '../../../../shared/components/UIElements/LoadingSpinner';
import BTBuyFormik from '../../BTBuyFormik';

import theme from '../../../../Styles';
import BTBuyResponse from './BTBuyResponse';
import SwitchNetwork from '../components/SwitchNetwork';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '6px',
};

export default function BTBuyForm({ owner, ...props }) {
  const auth = useContext(AuthContext);
  const [trxSuccess, setTrxSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmitHandler = async (event) => {
    setIsLoading(true);
    const web3 = new Web3(auth.provider);
    const networkId = await web3.eth.net.getId();
    const BTMint = new web3.eth.Contract(
      BuilderTokensBuild.abi,
      BuilderTokensBuild.networks[networkId].address
    );
    // todo change token value for mint
    const value = event.tokenCount * 0.005;
    const payment = web3.utils.toWei(value.toString(), 'ether');

    try {
      await BTMint.methods
        .mint(event.tokenCount)
        .send({
          from: auth.provider.selectedAddress,
          value: payment,
        })
        .then(function(receipt) {
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
    <Grid container>
      <Box sx={{ ...style }}>
        <BTBuyFormik
          isLoading={isLoading}
          onSubmitHandler={onSubmitHandler}
          chainId={auth.chainId}
        />

        <BTBuyResponse trxSuccess={trxSuccess} error={error} />

        <SwitchNetwork />
        {/* todo test variable network 80001 */}
        {auth.chainId !== 80001 && (
          <Box display='flex' justifyContent='flex-end'>
            <Button
              onClick={props.onClose}
              sx={{
                cursor: 'pointer',
              }}
            >
              Close
            </Button>
          </Box>
        )}
      </Box>
    </Grid>
  );
}
