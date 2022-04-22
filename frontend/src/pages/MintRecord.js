import React, { useContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import { Grid, Button, Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SVG from 'react-inlinesvg';

import { AuthContext } from '../shared/context/auth-context';
import PublicRecordBuild from '../assets/contracts/VisibleRecords.json';
import { useHttpClient } from '../shared/hooks/http-hook';
import BuilderTokenAlert from '../components/alerts/AlertBuilderToken';
import ScrollToTop from '../shared/components/util/ScrollToTop';
import DialogEmailTrx from '../shared/components/UIElements/DialogEmailTrx';
import ModalBTBuyNested from '../components/form/formik/ModalBTBuyNested';
import AlertConnectPolygon from '../components/alerts/AlertConnectPolygon';
import ErrorModal from '../shared/components/UIElements/ErrorModal';

import theme from '../Styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  record: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    boxShadow: '0 0 5px #999999',
  },
}));

const MintRecord = ({ record }) => {
  const auth = useContext(AuthContext);
  const [mrrReceipt, setMrrReceipt] = useState('');
  const [err, setErr] = useState('');
  const [tokenOwner, setTokenOwner] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [alertNoToken, setAlertNoToken] = useState(false);
  const [openBTTokenModal, setOpenBTTokenModal] = useState(false);
  const [responseMintObject, setResponseMintObject] = useState('');

  console.log('mode array:', record.modeArray);

  const classes = useStyles();

  ScrollToTop();

  const handleOwner = (bool) => {
    setTokenOwner(bool);
  };

  const handleCloseToken = () => {
    setOpenBTTokenModal(false);
  };

  const handleOpenToken = () => {
    setOpenBTTokenModal(true);
  };

  const handleClose = () => {
    setOpenEmailModal(false);
    setErr('');
    setResponseMintObject('');
    setMrrReceipt('');
  };

  const { sendRequest, error, clearError } = useHttpClient();

  console.log('auth.bttokencheck:', auth.BTTokenCheck);
  console.log('alert no token:', alertNoToken);
  console.log('tokenOwner:', tokenOwner);

  useEffect(() => {
    if (tokenOwner === false && auth.BTTokenCheck === false) {
      setAlertNoToken(true);
    } else {
      setAlertNoToken(false);
    }
  }, [auth.BTTokenCheck, tokenOwner]);

  const onSubmitMintRecord = (mode) => async () => {
    auth.detect();
    const modeDNA = mode.DNA;
    const modeName = mode.modeName;
    const web3 = new Web3(auth.provider);
    const networkId = await web3.eth.net.getId();
    const PubMint = new web3.eth.Contract(
      PublicRecordBuild.abi,
      PublicRecordBuild.networks[networkId].address
    );
    const value = 6;
    const payment = web3.utils.toWei(value.toString(), 'ether');

    // mint record
    sendRequest(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL}/users/mrrQueue`,
      'POST',
      JSON.stringify({ modeDNA, modeName, user: auth.currentAccount }),
      {
        'Content-Type': 'application/json',
      }
    )
      .then((responseMintObject) => {
        //open pending mint and send email dialog
        setTimeout(() => {
          setOpenEmailModal(true);
        }, 4000);
        setResponseMintObject(responseMintObject);
        return PubMint.methods
          .mintForAddress(
            responseMintObject.name,
            responseMintObject.description,
            'ipfs://' + responseMintObject.image,
            responseMintObject.message,
            responseMintObject.prCreateDate,
            responseMintObject.attrNFTName,
            responseMintObject.attrKeyword,
            responseMintObject.mode,
            auth.provider.selectedAddress,
            responseMintObject.dna
          )
          .send({
            from: auth.provider.selectedAddress,
            value: payment,
          });
      })
      .then((trx) => {
        console.log(trx);
        return sendRequest(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_BACKEND_URL}/users/initMrr`,
          'POST',
          JSON.stringify({ trx }),
          {
            'Content-Type': 'application/json',
          }
        );
      })
      .then((response) => {
        console.log(response);
        setMrrReceipt(response);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      });
  };

  if (error) {
    return <ErrorModal error={err.message} onClear={clearError} />;
  }

  return (
    <React.Fragment>
      {alertNoToken && (
        <BuilderTokenAlert modalControl={handleOpenToken} owner={handleOwner} />
      )}
      {auth.chainId === 1 && !alertNoToken && <AlertConnectPolygon />}
      <Container className={classes.root}>
        <Grid container>
          {record.modeArray.map((mode) => (
            <Grid key={mode.modeName} className={classes.record} item xs={12}>
              <Grid xs={12} md={6} item>
                <SVG
                  src={mode.svg}
                  className={classes.img}
                  alt='NFT Public Record'
                  title={mode.modeName}
                  uniquifyIDs={true}
                />
                <Box
                  sx={{ mt: theme.spacing(1), mb: theme.spacing(18) }}
                  textAlign='center'
                >
                  <Button
                    onClick={onSubmitMintRecord(mode)}
                    variant='contained'
                    size='large'
                    fullWidth
                    disabled={
                      (tokenOwner === false && auth.BTTokenCheck === false) ||
                      auth.chainId === 1
                    }
                  >
                    Mint Record
                  </Button>
                </Box>
              </Grid>
            </Grid>
          ))}
          <DialogEmailTrx
            receipt={mrrReceipt}
            open={openEmailModal}
            onClose={handleClose}
            record={record}
            mintedObject={responseMintObject}
            err={err}
          />
        </Grid>
      </Container>
      <ModalBTBuyNested
        owner={handleOwner}
        open={openBTTokenModal}
        onClose={handleCloseToken}
      />
    </React.Fragment>
  );
};

export default MintRecord;
