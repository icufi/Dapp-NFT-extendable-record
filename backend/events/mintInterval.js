const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { createAlchemyWeb3: CreateAlchemyWeb3 } = require('@alch/alchemy-web3');

const Record = require('../models/record');

// BAYC CONTRACT
const BAYCContract = require('../assets/contracts/PRABI/BAYC.json');

// TEST TOKENS CONTRACT
const TESTContract = require('../assets/contracts/PRABI/TestTokens.json');

// PUBLIC CONTRACTS
const PublicRecordBuild = require('../assets/contracts/VisibleModes.json');
const PublicMirrorBuild = require('../assets/contracts/ModeMirror.json');

// mintInterval mints at timed interval a mrrToken if a corresponding prToken has been minted
exports.mintInterval = async () => {
  const mnemonic = process.env.MNEMONIC_ADMIN;

  const alchemyURLEth = process.env.ETHEREUM;

  const alchemyURLPolygon = process.env.POLYGON;

  const hdWalletPolygon = new HDWalletProvider(mnemonic, alchemyURLPolygon);

  // sleep function to slow down loop
  const sleep = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  setInterval(async () => {
    // Public Record contract web3 init Polygon
    let web3Polygon;
    let accountsPolygon;
    let networkIdPolygon;
    let PubContract;

    try {
      web3Polygon = new CreateAlchemyWeb3(alchemyURLPolygon, {
        writeProvider: hdWalletPolygon,
      });

      accountsPolygon = await web3Polygon.eth.getAccounts();
      networkIdPolygon = await web3Polygon.eth.net.getId();

      PubContract = new web3Polygon.eth.Contract(
        PublicRecordBuild.abi,
        PublicRecordBuild.networks[networkIdPolygon].address
      );
    } catch (err) {
      const error = 'Failed to connect to Polygon network at mint Interval.';
      throw new Error(error);
    }

    // mirror contract polygon
    const MirrorContract = new web3Polygon.eth.Contract(
      PublicMirrorBuild.abi,
      PublicMirrorBuild.networks[networkIdPolygon].address
    );

    // find pending records in db
    let dbRecord;
    try {
      dbRecord = await Record.find({ pending: true });
    } catch (err) {
      throw new Error('Failed to retrieve records.', err);
    }

    // if no pending db records return out
    if (!dbRecord || dbRecord.length === 0) {
      console.log('No pending records found.');
      return;
    }


    const timeNow = Date.now();

    // eslint-disable-next-line no-restricted-syntax
    for (const record of dbRecord) {
      // if record is not pending return;
      if (record.pending === false) {
        console.log('Record pending status false in mint loop.');
        continue;
      }

      // if prToken has not been minted and more than 24 hours has passed record timeout true, pending false
      // this is expected to occur when mint is not completed by client side
      if (timeNow - record.pendingTime > 7200000) {
        try {
          record.pending = false;
          record.mrrTimeout = true;
          await record.save();
          continue; // end this loop iteration
        } catch (err) {
          console.log('Failed to save timeout record at interval.', err);
          continue;
        }
      }

      // get dna from db record
      const { dna } = record;

      // get prtokenID from dna to token ID mapping in pubcontract
      let prTokenId;
      try {
        prTokenId = await PubContract.methods
          .DNATokenCheck(dna)
          .call({ from: accountsPolygon[0] });
      } catch (err) {
        console.log(
          'Failed to get token Ids from network or they do not exist.',
          err
        );
        continue;
      }

      // if prtoken doesn't exist then return out without setting data to db
      if (!prTokenId || prTokenId === 0) {
        console.log('prtokenId does not exist or equals:', prTokenId);
        continue;
      }

      // if db prTokenId does not match contract tokenId then set pending false, record minting error to db
      if (
        prTokenId &&
        prTokenId > 0 &&
        record.prTokenId &&
        record.prTokenId > 0 &&
        prTokenId !== record.prTokenId
      ) {
        console.log('prTokenId db:', record.prTokenId);
        console.log('prTokenId contract:', prTokenId);
        console.log('prTokenIds do not match in db and contract.');
        try {
          record.pending = false;
          record.mintingError =
            'PrToken in db does not match contract for dna provided at mintInt.';
          await record.save();
          continue; // end this loop iteration
        } catch (err) {
          console.log(
            'Failed to save minting error. Token Ids do not match.',
            err
          );
          continue;
        }
      }

      // attempt to call mrrToken from mirror contract with given dbRecord DNA
      let mrrTokenId;
      try {
        mrrTokenId = await MirrorContract.methods.DNATokenCheck(dna).call({
          from: accountsPolygon[0],
        });
      } catch (err) {
        console.log('mrrTokenId by dbrecord dna failed.', err);
        continue;
      }

      console.log('mrrTokenId:', mrrTokenId);

      // if mrrTokenId exists and equals prTokenId, then mirror has already been minted dave to db prTokenId, mrrTokenId, pending false, mintcomplete true, continue;
      if (mrrTokenId && mrrTokenId > 0 && mrrTokenId === prTokenId) {
        try {
          record.prTokenId = prTokenId;
          record.mrrTokenId = mrrTokenId;
          record.pending = false;
          record.mintingComplete = true;
          await record.save();
          continue; // end loop iteration
        } catch (err) {
          console.log('Failed to update to minting complete.', err);
          continue;
        }
      }

      // owner Check cycle
      // if prTokenId exists at contract and mrrTokenID does not exist, get attrCreatorAddr from pubContract by prTokenId
      let confirmedPubTokenCreator; // guaranteed accurate, set to msg.sender in contract safemint function
      if (prTokenId && (!mrrTokenId || mrrTokenId === 0)) {
        try {
          confirmedPubTokenCreator = await PubContract.methods
            .getAttrCreatorAddr(prTokenId)
            .call({ from: accountsPolygon[0] });
          console.log('accounts polygon 0:', accountsPolygon[0]);
        } catch (err) {
          console.log(
            'Failed contract call for confirmedPubTokenCreator. Token may not exist.',
            err
          );
          continue;
        }

        // set address to lower case for comparisons
        confirmedPubTokenCreator = confirmedPubTokenCreator.toLowerCase();

        // check NFT owner status per record.nftTokenType
        let confirmedNFTTokenOwner;

        // START NFTPACK CONTRACT CALL-----------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------

        // BAYC
        if (record.nftTokenType === 'BAYC') {
          const baycAddr = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
          let web3Eth;
          let baycContract;

          // initial BAYC contract
          try {
            web3Eth = new CreateAlchemyWeb3(alchemyURLEth);
            baycContract = new web3Eth.eth.Contract(BAYCContract, baycAddr);
          } catch (err) {
            const error =
              'Failed to connect to BAYC contract on Ethereum network.';
            throw new Error(error);
          }

          try {
            const BaycTokenOwner = await baycContract.methods
              .ownerOf(record.nftTokenId)
              .call();
            const confirmedBaycTokenOwner = BaycTokenOwner.toLowerCase(); // addresses to lowercase for comparisons
            confirmedNFTTokenOwner = confirmedBaycTokenOwner;
            console.log('Bayc owner address:', confirmedNFTTokenOwner);
          } catch (err) {
            console.log('BAYC contract call failed.');
            continue;
          }
        }

        // TEST
        if (record.nftTokenType === 'TEST') {
          // change
          const testAddr = '0x52EA23F2fef28005bEf1DA54e971517C5863a1ad';

          // change
          let testContract;

          // initiate TEST contract
          try {
            web3Polygon = new CreateAlchemyWeb3(alchemyURLPolygon);

            // change
            testContract = new web3Polygon.eth.Contract(
              TESTContract.abi,
              testAddr
            );
          } catch (err) {
            // change
            console.log(
              'Failed to connect to Test contract on Ethereum network.',
              err
            );
            continue;
          }

          try {
            // change
            const NFTTokenOwner = await testContract.methods
              .ownerOf(record.nftTokenId)
              .call();
            confirmedNFTTokenOwner = NFTTokenOwner.toLowerCase(); // addresses to lowercase for comparisons
            console.log(
              'Confirmed Token owner address:',
              confirmedNFTTokenOwner
            );
          } catch (err) {
            // change
            console.log('Test contract call failed.');
            continue;
          }
        }
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        // END NFTPACK CONTRACT CALL^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

        // if no supported tokens owned or pubToken user does not own any supported NFTs at time of interval
        if (!confirmedNFTTokenOwner || confirmedNFTTokenOwner === 0) {
          console.log('No supported NFT tokens owned.');
          continue;
        }

        // if pubTokenCreator does not equal nftOwnerAddr or db record creator, set pending status to false and set mint error status
        if (
          confirmedPubTokenCreator !== confirmedNFTTokenOwner ||
          confirmedPubTokenCreator !==
            record.confirmedNFTTokenOwner.toLowerCase() ||
          confirmedNFTTokenOwner !== record.confirmedNFTTokenOwner.toLowerCase()
        ) {
          try {
            record.pending = false;
            record.mintingError =
              'Pub attrCreator does not equal nftToken owner or record creator at mint interval';
            await record.save();
            continue;
          } catch (err) {
            console.log(
              'Failed to save record to db that attrCreator does not equal nftToken owner or record creator.'
            );
            continue;
          }
        }

        // if attrCreatorAddr equals currnet NFT token owner and bayc token owner at the time that record data was generated. start mrr mint...
        if (
          confirmedPubTokenCreator === confirmedNFTTokenOwner &&
          confirmedPubTokenCreator ===
            record.confirmedNFTTokenOwner.toLowerCase() &&
          confirmedNFTTokenOwner === record.confirmedNFTTokenOwner.toLowerCase()
        ) {
          let mrrTrx;
          console.log('in mint function');

          // prepend ipfs:// to image
          const metadataImage = `ipfs://${record.image}`;

          // sleep to slow down loop
          await sleep(10000);

          // mrrMint function takes in prTokenId dbRecord data, confirmedPubTokenCreator, and dna from dbRecord
          try {
            const account = accountsPolygon[3];
            const tx = MirrorContract.methods.safeMint(
              prTokenId,
              record.name,
              record.description,
              metadataImage,
              record.message,
              record.prCreateDate,
              record.attrNFTName,
              record.attrKeyword,
              record.modeUsed,
              confirmedPubTokenCreator,
              dna
            );
            const gas = await tx.estimateGas({ from: account });
            const gasPrice = Web3.utils.toWei('60', 'gwei');
            const data = tx.encodeABI();
            const nonce = await web3Polygon.eth.getTransactionCount(
              account,
              'latest'
            );
            console.log('nonce:', nonce);
            const txData = {
              from: account,
              to: MirrorContract.options.address,
              data,
              gas,
              gasPrice,
              nonce,
            };

            mrrTrx = await web3Polygon.eth.sendTransaction(txData);
          } catch (err) {
            console.log('Mirror mint failed at interval.', err);
            continue;
          }

          // if trx success, call for mrrtokenId bc not returned on transaction receipt
          if (mrrTrx.status === true) {
            // sleep to slow down loop allow for trx to populate network
            await sleep(5000);

            let mrrTokenIdFinal;
            try {
              mrrTokenIdFinal = await MirrorContract.methods
                .DNATokenCheck(dna)
                .call({
                  from: accountsPolygon[0],
                });
            } catch (err) {
              console.log(
                'Unable to get mrrTokenId from Mirror contract.',
                err
              );
            } finally {
              // if mrrTokenId exists update otherwise update empty string (will be caught in next loop iteration and updated), update database with mrrTrxHash, prTokenId, mrrTokenIdFinal, pending false, mintingComplete true, mintwhere,
              try {
                record.mrrTrxHash = mrrTrx.transactionHash;
                record.prTokenId = prTokenId;
                // eslint-disable-next-line no-unneeded-ternary
                record.mrrTokenId = mrrTokenIdFinal ? mrrTokenIdFinal : '';
                record.pending = false;
                record.mintingComplete = true;
                record.mrrMintWhere = 'mrr interval';
                await record.save();
                console.log(
                  `minted token ${mrrTokenIdFinal}, pending status set to false`
                );
                continue;
              } catch (err) {
                console.log(
                  'Failed to update db with completed mint records.',
                  err
                );
                continue;
              }
            }
          }
        }
        console.log('problem with owners');
      }
    }
  }, 600000);
};
