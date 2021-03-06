import React, { useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

import { AuthContext } from '../shared/context/auth-context';
import VisibleModesBuild from '../assets/contracts/VisibleModes.json';
import { useHttpClient } from '../shared/hooks/http-hook';
import BuilderTokenAlert from '../components/alerts/AlertBuilderToken';
import ScrollToTop from '../shared/components/util/ScrollToTop';
import BTBuyForm from '../components/form/BTBuyForm';
import AlertConnectPolygon from '../components/alerts/AlertConnectPolygon';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import ModalForms from '../components/form/formik/components/ModalForms';
import ModeTrx from '../shared/components/UIElements/ModeTrx';


const MintRecord = ({ record }) => {
  const auth = useContext(AuthContext);
  const [mrrReceipt, setMrrReceipt] = useState('');
  const [err, setErr] = useState('');
  const [tokenOwner, setTokenOwner] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [alertNoToken, setAlertNoToken] = useState(false);
  const [openBTTokenModal, setOpenBTTokenModal] = useState(false);
  const [responseMintObject, setResponseMintObject] = useState('');

  ScrollToTop();

  const handleOwner = (owner) => {
    setTokenOwner(owner);
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

  useEffect(() => {
    if (!tokenOwner && !auth.BTTokenCheck) {
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
    const ModesMint = new web3.eth.Contract(
      VisibleModesBuild.abi,
      VisibleModesBuild.networks[networkId].address
    );
    // todo test value variable
    const value = 0.005;
    const payment = web3.utils.toWei(value.toString(), 'ether');

    // mint record
    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/users/mrrQueue`,
      'POST',
      JSON.stringify({
        modeDNA,
        modeName,
        user: auth.currentAccount,
      }),
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
        return ModesMint.methods
          .safeMint(
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
            // todo reinstate auth.provider.selectedAddress changed for testing
            from: auth.provider.selectedAddress,
            value: payment,
          });
      })
      .then((trx) => {
        return sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/initMrr`,
          'POST',
          JSON.stringify({ trx }),
          {
            'Content-Type': 'application/json',
          }
        );
      })
      .then((response) => {
        setMrrReceipt(response);
      })
      .catch((err) => {
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
      <ModeTrx
        record={record}
        tokenOwner={tokenOwner}
        onSubmitMintRecord={onSubmitMintRecord}
        receipt={mrrReceipt}
        open={openEmailModal}
        mintedObject={responseMintObject}
        err={err}
        onClose={handleClose}
      />
      <ModalForms
        open={openBTTokenModal}
      >
        <BTBuyForm owner={handleOwner} onClose={handleCloseToken} />
      </ModalForms>
    </React.Fragment>
  );
};

export default MintRecord;
