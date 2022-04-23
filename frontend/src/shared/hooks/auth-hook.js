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
    if (currentAccount) {
      if (chainId === 1) {
        // eslint-disable-next-line no-undef
        const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
        const alchemy = async () => {
          if (chainId === 1) {
            let userAddress;
            let BTContract;
            try {
            const web3 = createAlchemyWeb3(alchemyKey);
            const accounts = await web3.eth.getAccounts();
             userAddress = accounts[0];
            const networkId = await web3.eth.net.getId();
            BTContract = new web3.eth.Contract(
              BuilderTokens.abi,
              BuilderTokens.networks[networkId].address
            );
            } catch (err) {
              throw new Error(
                'Failed to connect to ethereum at Auth context.'
              )
            }
            let BTTokensOwned;
            try {
              BTTokensOwned = await BTContract.methods
                .balanceOf(userAddress)
                .call();
            } catch (err) {
              throw new Error(
                'Network error. Unable to retrieve Builder Token balance of user.',
                424
              );
            }

            if (BTTokensOwned && BTTokensOwned >= 1) {
              setBTTokenCheck(true);
            }

            console.log('bttokens owned ETH:', BTTokensOwned);
          }
        };
        alchemy();
      }
    }
  }, [chainId, currentAccount, provider]);

  useEffect(() => {
    if (currentAccount) {
      if (chainId === 137) {
        const initBTTokenCheckPolygon = async () => {
          const provider = await detectProvider();
          const web3 = new Web3(provider);
          const userAddress = provider.selectedAddress;
          const networkId = await web3.eth.net.getId();
          const BTContract = new web3.eth.Contract(
            BuilderTokens.abi,
            BuilderTokens.networks[networkId].address
          );
          let BTTokensOwned;
          try {
            BTTokensOwned = await BTContract.methods
              .balanceOf(userAddress)
              .call();
          } catch (err) {
            throw new Error(
              'Network error. Unable to retrieve Builder Token balance of user.',
              424
            );
          }

          if (BTTokensOwned && BTTokensOwned >= 1) {
            setBTTokenCheck(true);
          }

          console.log('bttokens owned Polygon:', BTTokensOwned);
        };
        initBTTokenCheckPolygon();
      }
    }
  }, [chainId, currentAccount, provider]);

  useEffect(() => {
    if (currentAccount) {
      if (chainId === 80001) {
        const initBTTokenCheckMumbai = async () => {
          const provider = await detectProvider();
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          const userAddress = accounts[0];
          const networkId = await web3.eth.net.getId();
          const BTContract = new web3.eth.Contract(
            BuilderTokens.abi,
            BuilderTokens.networks[networkId].address
          );
          let BTTokensOwned;
          try {
            BTTokensOwned = await BTContract.methods
              .balanceOf(userAddress)
              .call();
          } catch (err) {
            throw new Error(
              'Network error. Unable to retrieve Builder Token balance of user.',
              424
            );
          }

          if (BTTokensOwned && BTTokensOwned >= 1) {
            setBTTokenCheck(true);
          }

          console.log('bttokens owned Mumbai:', BTTokensOwned);
        };
        initBTTokenCheckMumbai();
      }
    }
  }, [chainId, currentAccount, provider]);

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
