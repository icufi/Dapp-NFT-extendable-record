import { useState, useCallback, useEffect } from 'react';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import Web3 from 'web3';
import detectProvider from '@metamask/detect-provider';

import BuilderTokens from '../../assets/contracts/BuilderTokens.json';

export const useAuth = () => {
  const [BTTokenCheck, setBTTokenCheck] = useState(false);
  const [provider, setProvider] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [chainId, setChainId] = useState('');

  const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

  const detect = useCallback(async () => {
    const provider = await detectProvider();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
    const chainId = await web3.eth.net.getId();
    setChainId(chainId);
    if (provider) {
      setProvider(provider);
      setCurrentAccount(userAddress);
    }
  }, []);

  const tokenCheck = async (contract, userAddr) => {
    try {
      return await contract.methods.balanceOf(userAddr).call();
    } catch (err) {
      throw new Error(
        'Network error. Unable to retrieve Builder Token balance of user.',
        424
      );
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        detect();
      });
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  }, [detect]);

  useEffect(() => {
    const btToken = async () => {
      const web3 = createAlchemyWeb3(alchemyKey);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const userAddress = accounts[0];
      const BTContract = new web3.eth.Contract(
        BuilderTokens.abi,
        BuilderTokens.networks[networkId].address
      );

      if (BTContract && userAddress) {
      try {
        const BTTokensOwned = tokenCheck(BTContract, userAddress);
         console.log('tokensOwned:', BTTokensOwned);
        if (BTTokensOwned && BTTokensOwned >= 1) {
          setBTTokenCheck(true);
        }
      } catch (err) {
        throw new Error('Failed to connect to ethereum at Auth context.');
      }}
    };
    btToken();

  }, [alchemyKey]);

  const checkWalletIsConnected = useCallback(async () => {
    const { ethereum } = window;

    if (
      typeof window === 'undefined' ||
      typeof window.ethereum === 'undefined'
    ) {
      console.log('Make sure you have Metamask installed!');
      return;
    } else {
      console.log('Wallet exists. Ready to connect.');
    }
    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Found an account! Address: ', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log('Error: ', error);
    }
  }, []);

  return {
    checkWalletIsConnected,
    provider,
    detect,
    currentAccount,
    BTTokenCheck,
    chainId,
  };
};
