const { validationResult } = require('express-validator');
const axios = require('axios');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');

const HttpError = require('../models/http-error');
const Email = require('../models/email');
const Suggestion = require('../models/suggestion');
const Record = require('../models/record');
const wordWrap = require('../util/wordWrap');
const { mintInterval } = require('../events/mintInterval');
const { emailInterval } = require('../events/emailInterval');

// PUBCONTRACTS
const PublicRecordBuild = require('../assets/contracts/VisibleModes.json');
const PublicMirrorBuild = require('../assets/contracts/ModeMirror.json');

// BAYC CONTRACT AND TEMPLATES
const BAYCContract = require('../assets/contracts/PRABI/BAYC.json');
const BAYCMaster = require('../assets/templates/BAYC/BAYCMaster');

// TEST TEMPLATE AND CONTRACT
const TESTMaster = require('../assets/templates/TestTokens/TESTMaster');
const TESTContract = require('../assets/contracts/PRABI/TestTokens.json');

// PROVIDER variables
const mnemonic = process.env.MNEMONIC_ADMIN;
const alchemyURLEth = process.env.ETHEREUM;
const alchemyURLPolygon = process.env.POLYGON;

// PROVIDERS
const hdWalletPolygon = new HDWalletProvider(mnemonic, alchemyURLPolygon, 0);
const hdWalletEth = new HDWalletProvider(mnemonic, alchemyURLEth, 0);

// mint interval call
mintInterval();

// email interval call
emailInterval();

// sets existing record to pending status true before mint, return nothing to frontend
const mrrQueue = async (req, res, next) => {
  // pinata credentials
  const pinata = pinataSDK(process.env.PINATA_USER, process.env.PINATA_KEY);

  // get dna from req.body to call db record
  const { modeDNA } = req.body;
  let { modeName } = req.body;
  let dbRecord;
  let svg;
  let pinnedImgHsh;
  let confirmDNA;
  let contractDNA;

  // image creation variables
  let returnedB64;
  let image;
  let textOne;
  let textTwo;
  let textThree;
  let textFour;
  let timeStampImage;
  let nftTokenId;
  let prKeyword;
  let creationDate;
  let requestedMode;
  let modeIndex;

  // get dbrecord by dna
  try {
    dbRecord = await Record.find({ modeDNA: modeDNA });
  } catch (err) {
    const error = new HttpError(
      'Could not retrieve record in our database.',
      503
    );
    return next(error);
  }

  // if non or more than one record in returned array then error
  if (!dbRecord || dbRecord.length !== 1) {
    const error = new HttpError('Record is not unique or does not exist.');
    return next(error);
  }

  // get record as object
  const [record] = dbRecord;

  // svg image owner variable set to user confirmed against BAYC contract
  const ownerAddr = record.confirmedNFTTokenOwner.toLowerCase();
  const user = req.body.user.toLowerCase();
  const recordUser = record.user.toLowerCase();

  // ownership check
  if (ownerAddr !== user || recordUser !== user) {
    const error = new HttpError(
      'User does not match our records or NFT ownership records.',
      403
    );
    return next(error);
  }

  // START IMAGE CREATION
  // START NFTPACK IMAGE FROM IPFS----------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------

  // BAYC
  if (record.nftTokenType === 'BAYC') {
    try {
      responseImage = await axios.get(
        `https://infura-ipfs.io/ipfs/${record.NFTCID}`,
        {
          responseType: 'arraybuffer',
        }
      );
    } catch (err) {
      const error = new HttpError(
        'Network error. Failed to retrieve your NFT image from the network.',
        424
      );
      return next(error);
    }

    // convert response image to Base64
    returnedB64 = Buffer.from(responseImage.data).toString('base64');

    // format image variable with Base64 image for svg insertion
    image = `<image
        style='overflow:visible;'
        width='631'
        height='631'
        xlink:href='data:image/png;base64,${returnedB64}'
        transform='matrix(1 0 0 1 18 13.5)'
      ></image>`;

    // msg word chunks
    textOne = record.textOne;
    textTwo = record.textTwo;
    textThree = record.textThree;
    textFour = record.textFour;

    // time stamp img embed
    timeStampImage = record.timeStampImage;

    // svg image token id for provenance stack
    nftTokenId = record.nftTokenId;

    // svg image keyword formatted
    prKeyword = record.attrKeyword ? ` ${record.attrKeyword} =&gt;` : '';

    // record creation date
    creationDate = record.prCreateDate;

    // filter master mode array for mode requested by user
    requestedMode = BAYCMaster.filter((mode) => modeName === mode.name);
    requestedMode = requestedMode[0];

    console.log('requested mode:', requestedMode);

    // find the index of the requested mode in the baycmaster array
    modeIndex = BAYCMaster.findIndex((modes) => requestedMode === modes);
    console.log('modeIndex:', modeIndex);

    // create svg image using mode requested by user
    svg = requestedMode(
      image,
      textOne ? textOne : '',
      textTwo ? textTwo : '',
      textThree ? textThree : '',
      textFour ? textFour : '',
      ownerAddr,
      nftTokenId,
      timeStampImage,
      creationDate
    );
  }

  // TEST
  if (record.nftTokenType === 'TEST') {
    try {
      responseImage = await axios.get(
        `https://infura-ipfs.io/ipfs/${record.NFTCID}`,
        {
          responseType: 'arraybuffer',
        }
      );
    } catch (err) {
      const error = new HttpError(
        'Network error. Failed to retrieve your NFT image from the network.',
        424
      );
      return next(error);
    }

    // convert response image to Base64
    returnedB64 = Buffer.from(responseImage.data).toString('base64');

    // format image variable with Base64 image for svg insertion
    image = `<image
        style='overflow:visible;'
        width='631'
        height='631'
        xlink:href='data:image/png;base64,${returnedB64}'
        transform='matrix(1 0 0 1 18 13.5)'
      ></image>`;

    // msg word chunks
    textOne = record.textOne;
    textTwo = record.textTwo;
    textThree = record.textThree;
    textFour = record.textFour;

    // time stamp img embed
    timeStampImage = record.timeStampImage;

    // svg image token id for provenance stack
    nftTokenId = record.nftTokenId;

    // svg image keyword formatted
    prKeyword = record.attrKeyword ? ` ${record.attrKeyword} =&gt;` : '';

    // record creation date
    creationDate = record.prCreateDate;

    // filter master mode array for mode requested by user
    requestedMode = TESTMaster.filter((mode) => modeName === mode.name);
    requestedMode = requestedMode[0];

    console.log('requested mode:', requestedMode);

    // find the index of the requested mode in the baycmaster array
    modeIndex = TESTMaster.findIndex((modes) => requestedMode === modes);
    console.log('modeIndex:', modeIndex);

    // create svg image using mode requested by user
    svg = requestedMode(
      image,
      textOne ? textOne : '',
      textTwo ? textTwo : '',
      textThree ? textThree : '',
      textFour ? textFour : '',
      ownerAddr,
      nftTokenId,
      timeStampImage,
      creationDate
    );
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  // END NFTPACK^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // END IMAGE CREATION

  // get dna of image plus metadata to compare with dna created at init
  confirmDNA = await Web3.utils.soliditySha3(
    { t: 'string', v: record.name },
    { t: 'string', v: record.description },
    { t: 'string', v: svg },
    { t: 'string', v: record.message },
    { t: 'string', v: record.prCreateDate },
    { t: 'string', v: record.attrNFTName },
    { t: 'string', v: record.attrKeyword }
  );

  console.log('confirm DNA:', confirmDNA);
  // find dna by index in modeDNA array
  const DNAIndex = record.modeDNA.findIndex((DNA) => confirmDNA === DNA);
  console.log('dna index:', DNAIndex);

  // if dna index does not match mode index, error
  if (DNAIndex !== modeIndex || DNAIndex === -1 || modeIndex === -1) {
    const error = new HttpError('Image failed quality control checks.', 503);
    return next(error);
  }

  // pinata api pins image to ipfs
  try {
    // hash image to cid and save image temporarily to file system
    fs.writeFileSync(__dirname + `/assets/${ownerAddr}.svg`, svg);
    const options = {
      pinataOptions: { cidVersion: 0 },
    };

    // call image from file system
    const readableStreamForFile = fs.createReadStream(
      __dirname + `/assets/${ownerAddr}.svg`
    );

    // pin upload and pin image using pinata api
    pinnedImgHsh = await pinata
      .pinFileToIPFS(readableStreamForFile, options)
      .then((result) => {
        return result.IpfsHash;
      });

    // delete temp img file from directory
    fs.unlink(__dirname + `/assets/${ownerAddr}.svg`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    // confirm image hashing and pinning succesful
    if ('Qm' !== pinnedImgHsh.substring(0, 2)) {
      const error = new HttpError('Image failed to pin to ipfs.', 503);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Network error. Failed uploading image of record to ipfs.',
      424
    );
    return next(error);
  }

  // generate record dna at contract
  try {
    contractDNA = await Web3.utils.soliditySha3(
      { t: 'string', v: record.name },
      { t: 'string', v: record.description },
      { t: 'string', v: 'ipfs://' + pinnedImgHsh },
      { t: 'string', v: record.message },
      { t: 'string', v: record.prCreateDate },
      { t: 'string', v: record.attrNFTName },
      { t: 'string', v: record.attrKeyword }
    );
  } catch (err) {
    const error = new HttpError('Failed to generate contract record DNA.', 503);
    return next(error);
  }

  // format mode name function
  const modeNameFormat = (_modeName) => {
    const artist = _modeName.substring(_modeName.length - 9);
    const tokenType = _modeName.substring(0, 4);
    const modeKeyword = _modeName.substring(4, _modeName.length - 9);
    return artist.concat('-', tokenType, '-', modeKeyword);
  };

  // format modeName
  modeName = modeNameFormat(modeName);
  console.log('mode name formatted:', modeName);

  try {
    record.image = pinnedImgHsh;
    record.pending = true;
    record.pendingTime = Date.now();
    record.mintingComplete = false;
    record.modeUsed = modeName;
    record.dna = contractDNA;
    await record.save();
  } catch (err) {
    const error = new HttpError(
      'Database failed to updated to pending status.',
      503
    );
    return next(error);
  }

  try {
    res.status(201).json({
      user: record.user,
      nftTokenType: record.nftTokenType,
      nftTokenId: record.nftTokenId,
      name: record.name,
      description: record.description,
      image: pinnedImgHsh,
      message: record.message,
      prCreateDate: record.prCreateDate,
      dna: contractDNA,
      code: 201,
      attrNFTName: record.attrNFTName,
      attrKeyword: record.attrKeyword,
      mode: modeName,
    });
    return;
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Network failure. Response object not returned to client.',
      424
    );
    return next(error);
  }
};

// initMrr mints a mrrToken and sends email in the case that the user stays on the webpage for the duration of the pubContract prToken mint process
const initMrr = async (req, res, next) => {
  // Public Record contract web3 init Polygon
  let web3Polygon;
  let accountsPolygon;
  let networkIdPolygon;
  let PubContract;

  try {
    web3Polygon = createAlchemyWeb3(alchemyURLPolygon, {
      writeProvider: hdWalletPolygon,
    });
    accountsPolygon = await web3Polygon.eth.getAccounts();
    networkIdPolygon = await web3Polygon.eth.net.getId();
    PubContract = new web3Polygon.eth.Contract(
      PublicRecordBuild.abi,
      PublicRecordBuild.networks[networkIdPolygon].address
    );
  } catch (err) {
    throw new Error('Failed to connect to PubContract at Polygon Alchemy.');
  }

  // mirror contract polygon
  const MirrorContract = new web3Polygon.eth.Contract(
    PublicMirrorBuild.abi,
    PublicMirrorBuild.networks[networkIdPolygon].address
  );

  // returned transaction data from client unconfirmed/untrusted
  const reportedTrxHash = req.body.trx.events[0].transactionHash;
  const status = req.body.trx.status;

  // if client transaction fails, return
  if (!status || status == false) {
    const error = new HttpError('Minting failed.', 424);
    return next(error);
  }

  // get token dna from pubcontract based on reported trx prTokenId
  const notConfirmedPubTokenId =
    req.body.trx.events.Transfer.returnValues.tokenId;
  let pubContractDNA;
  try {
    pubContractDNA = await PubContract.methods
      .DNA(notConfirmedPubTokenId)
      .call({ from: accountsPolygon[0] });
  } catch (err) {
    const error = new HttpError('Network error. PubContract DNA failed.', 424);
    return next(error);
  }

  // if PrToken dna does not exist, return
  if (!pubContractDNA || pubContractDNA == 0) {
    const error = new HttpError('Token DNA does not exist.', 403);
    return next(error);
  }

  // get prTokenID creator (this is a confirmed msg.sender address of prTokenId trx creator)
  let confirmedPubTokenCreator;
  try {
    confirmedPubTokenCreator = await PubContract.methods
      .getAttrCreatorAddr(notConfirmedPubTokenId)
      .call({ from: accountsPolygon[0] });
    confirmedPubTokenCreator = confirmedPubTokenCreator.toLowerCase(); // lower case address
  } catch (err) {
    const error = new HttpError(
      'Network error. Failed to call Pub contract.',
      424
    );
    return next(error);
  }

  // if confirmed pubTokenCreator does not exist, return
  if (!confirmedPubTokenCreator || confirmedPubTokenCreator == 0) {
    const error = new HttpError('Pub token does not exist.', 403);
    return next(error);
  }

  // get dbRecord by dna from reported prToken dna
  let dbRecord;
  try {
    dbRecord = await Record.find({ dna: pubContractDNA });

    console.log('pubContractDNA:', pubContractDNA);

    if (!dbRecord || dbRecord.length != 1) {
      throw new Error('Record is not unique or does not exist!');
    }
    dbRecord = dbRecord[0];
  } catch (err) {
    const error = new HttpError('Failed to find a unique record!', 503);
    return next(error);
  }

  // if confirmed pubToken creator does not match trx prToken owner or does not match db
  let notConfirmedTrxCreator = req.body.trx.from.toLowerCase();

  if (
    notConfirmedTrxCreator != confirmedPubTokenCreator ||
    notConfirmedTrxCreator != dbRecord.confirmedNFTTokenOwner ||
    notConfirmedTrxCreator != dbRecord.user
  ) {
    const error = new HttpError(
      'Transaction token creator does not match our records.',
      403
    );
    return next(error);
  }

  // check for double mint attempt
  if (
    dbRecord.mintingComplete === true ||
    dbRecord.mintingError ||
    dbRecord.mrrMintWhere
  ) {
    try {
      dbRecord.mintingError = 'Suspected double mint attempt at initMrr.';
      await dbRecord.save();
    } catch (err) {
      const error = new HttpError(
        'Failed to update db with possible double mint attempt.',
        500
      );
      return next(error);
    }
  }

  // check for timeout set by mintInterval
  if (dbRecord.mrrTimeout === true) {
    try {
      dbRecord.mintingError = 'Timeout at initMrr.';
      await dbRecord.save();
    } catch (err) {
      const error = new HttpError(
        'Failed to update db with minting error. Timeout at initMrr.',
        500
      );
      return next(error);
    }
  }

  // confirmed NFT token owner variable
  let confirmedNFTTokenOwner;

  // NFTPACK START OWNERSHIP CHECK CALL TO NFT CONTRACT------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // BAYC
  if (dbRecord.nftTokenType === 'BAYC') {
    // BAYC web3 init Ethereum
    const baycAddr = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    let web3Eth;
    let accountsEth;
    let networkIdEth;
    let baycContract;

    // BAYC initialize contract
    try {
      web3Eth = createAlchemyWeb3(alchemyURLEth);
      networkIdEth = await web3Eth.eth.net.getId();
      baycContract = new web3Eth.eth.Contract(BAYCContract, baycAddr);
    } catch (err) {
      throw new Error('Failed to connect to BAYC contract at alchem Eth.', err);
    }

    // get bayc owner from network based on token provided and previously checked at generation
    try {
      const BaycTokenOwner = await baycContract.methods
        .ownerOf(dbRecord.nftTokenId)
        .call();
      confirmedNFTTokenOwner = BaycTokenOwner.toLowerCase();
    } catch (err) {
      const error = new HttpError('Ethereum token owner call failed.', 500);
      return next(error);
    }
  }

  // TEST
  if (dbRecord.nftTokenType === 'TEST') {
    // BAYC web3 init Ethereum
    const testAddr = '0x52EA23F2fef28005bEf1DA54e971517C5863a1ad';
    let web3Polygon;
    let accountsEth;
    let networkIdEth;
    let testContract;

    // BAYC initialize contract
    try {
      web3Polygon = createAlchemyWeb3(alchemyURLPolygon);
      networkIdPolygon = await web3Polygon.eth.net.getId();
      testContract = new web3Polygon.eth.Contract(TESTContract.abi, testAddr);
    } catch (err) {
      throw new Error('Failed to connect to Test Token contract.', err);
    }

    // get bayc owner from network based on token provided and previously checked at generation
    try {
      const TestTokenOwner = await testContract.methods
        .ownerOf(dbRecord.nftTokenId)
        .call();
      confirmedNFTTokenOwner = TestTokenOwner.toLowerCase();
    } catch (err) {
      const error = new HttpError('Ethereum token owner call failed.', 500);
      return next(error);
    }
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // end nftTokenType NFT package filters with confirmedNFTTokenOwner from ethereum contract call
  // END NFTPACK END OWNERSHIP CALL TO NFT CONTRACT---------------------------------------------------------------------------------------------------------------------------

  // if confirmed nft token owner doesn't exist, return
  if (!confirmedNFTTokenOwner || confirmedNFTTokenOwner == 0) {
    const error = new HttpError(
      'Unable to confirm NFT token ownership. Network error.',
      403
    );
    return next(error);
  }

  // check NFT token owner equals trx token owner
  if (confirmedNFTTokenOwner != notConfirmedTrxCreator) {
    try {
      dbRecord.mintingError =
        'NFT token owner does not equal transaction creator.';
      dbRecord.pending = false;
      await dbRecord.save();
      const error = new HttpError(
        'NFT token owner and trasaction creator are not the same person.',
        403
      );
      return next(error);
    } catch (err) {
      const error = new HttpError(
        'Database failed to update NFT token owner does not equal transaction creator.',
        500
      );
      return next(error);
    }
  }

  // if check to confirm BAYC token owner = onchain pub token owner
  if (confirmedNFTTokenOwner != confirmedPubTokenCreator) {
    try {
      dbRecord.mintingError =
        'NFT token owner and pub token creator are not the same person.';
      dbRecord.pending = false;
      await dbRecord.save();
      const error = new HttpError(
        'NFT token owner and token minter are not the same person.',
        403
      );
      return next(error);
    } catch (err) {
      const error = new HttpError(
        'Database failed to update NFT token owner and pub token creator are not the same person.',
        500
      );
      return next(error);
    }
  }

  // if check to confirm pub token owner = unconfirmed trx creator
  if (confirmedPubTokenCreator != notConfirmedTrxCreator) {
    try {
      dbRecord.mintingError = 'Pub token creator does not equal trx creator.';
      dbRecord.pending = false;
      await dbRecord.save();
      const error = new HttpError(
        'Public record token creator does not equal trx creator.',
        403
      );
      return next(error);
    } catch (err) {
      const error = new HttpError(
        'Failed to update db that Pub token creator does not equal trx creator.',
        500
      );
      return next(error);
    }
  }

  // if check to confirm BAYC token owner = db confirmed token owner is the same owner when record was generated
  if (confirmedNFTTokenOwner != dbRecord.confirmedNFTTokenOwner.toLowerCase()) {
    try {
      dbRecord.mintingError =
        'NFT token owner does not equal record creator at time of minting.';
      dbRecord.pending = false;
      await dbRecord.save();
      const error = new HttpError(
        'NFT token owner does not equal record creator at time of minting.',
        403
      );
      return next(error);
    } catch (err) {
      const error = new HttpError(
        'Databased failed to update that confirmed NFT token owner does not equal record creator at time of minting.',
        500
      );
      return next(error);
    }
  }

  // updating database variable with attrcreatoraddress, tokenid, trxhash
  dbRecord.prTokenId = notConfirmedPubTokenId;
  dbRecord.attrCreatorAddress = confirmedNFTTokenOwner;
  dbRecord.PubTrxHash = reportedTrxHash;

  // prepend ipfs:// to image
  const metadataImage = 'ipfs://' + dbRecord.image;

  // initiate mint to mirror contract
  let mrrTrx;
  try {
    const account = accountsPolygon[2];
    const tx = MirrorContract.methods.safeMint(
      dbRecord.prTokenId,
      dbRecord.name,
      dbRecord.description,
      metadataImage,
      dbRecord.message,
      dbRecord.prCreateDate,
      dbRecord.attrNFTName,
      dbRecord.attrKeyword,
      dbRecord.modeUsed,
      confirmedPubTokenCreator,
      dbRecord.dna
    );
    const gas = await tx.estimateGas({ from: account });
    const gasPrice = Web3.utils.toWei('60', 'gwei');
    const data = tx.encodeABI();
    const nonce = await web3Polygon.eth.getTransactionCount(account, 'latest');
    const txData = {
      from: account,
      to: MirrorContract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
    };

    mrrTrx = await web3Polygon.eth.sendTransaction(txData);
    console.log('minted @ initMrr');
  } catch (err) {
    // if mint fails update db
    try {
      console.log('mrr error:', err);
      dbRecord.pending = true;
      dbRecord.mrrTrxError = 'Minting error occured at initMrr.';
      await dbRecord.save();
    } catch (err) {
      throw new Error(
        'Failed updating database with mint error at initMrr.',
        err
      );
    }
    const error = new HttpError(
      'Mirror mint failed at network at init mirror.',
      424
    );
    return next(error);
  }

  // get mrrTokenId from contract, it is not returned on trx success object
  let mrrTokenIdFinal;
  if (mrrTrx.status === true) {
    try {
      mrrTokenIdFinal = await MirrorContract.methods
        .DNATokenCheck(dbRecord.dna)
        .call({
          from: accountsPolygon[0],
        });
    } catch (err) {
      console.log(err);
    } finally {
      // add mrrtrx hash to database
      try {
        dbRecord.mrrTrxHash = mrrTrx.transactionHash;
        dbRecord.pending = false;
        dbRecord.mintingComplete = true;
        dbRecord.mrrTokenId = mrrTokenIdFinal ? mrrTokenIdFinal : '';
        dbRecord.mrrMintWhere = 'initMrr';
        await dbRecord.save();
        console.log(
          `minted token ${mrrTokenIdFinal} @ initMrr, pending status set to false`
        );
      } catch (err) {
        console.log(err);
        throw new Error('Failed to save Mirror Trx Hash to DB.', 424);
      }
    }

    try {
      res.status(201).json({
        mrrTokenId: mrrTokenIdFinal,
        code: 201,
      });
    } catch (err) {
      const error = new HttpError('MrrMint response failed.', 424);
      return next(error);
    }
  } else {
    const error = new HttpError('Mirror transaction did not mint.');
    return next(error);
  }
};

// initRecord creates image and record in db, returns image to frontend
const initRecord = async (req, res, next) => {
  // pinata api auth
  const pinata = pinataSDK(process.env.USER, process.env.API_KEY);

  // date generation and formatting
  const creationDate = new Date()
    .toLocaleString()
    .split(/\D/)
    .slice(0, 3)
    .map((num) => num.padStart(2, '0'))
    .join('/');

  // image time stamp
  const timeStampImage = Date.now();

  // user routes express-validator
  const errors = validationResult(req);

  // if no errors in express validator error object
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed.', 422);
    return next(error);
  }

  // get owner of nft token from ethereum contract
  let confirmedNFTTokenOwner;

  // this variable is set per tokentype and used in record body creation below
  let attrNFTName;

  // START NFTPACK
  // START NFT OWNER CALL FILTER--------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // BAYC
  if (req.body.nftTokenType === 'BAYC') {
    try {
      const baycAddr = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'; // BAYC contract address
      const web3Eth = createAlchemyWeb3(alchemyURLEth, {
        writeProvider: hdWalletEth,
      });
      const baycContract = new web3Eth.eth.Contract(BAYCContract, baycAddr);
      let confirmedBAYCTokenOwner = await baycContract.methods
        .ownerOf(req.body.nftTokenId)
        .call();
      confirmedBAYCTokenOwner = confirmedBAYCTokenOwner.toLowerCase(); // address to lowercase for comparison
      confirmedNFTTokenOwner = confirmedBAYCTokenOwner;
    } catch (err) {
      console.log(err);
      const error = new HttpError('Network error calling BAYC contract.', 424);
      return next(error);
    }

    // set variable as part of nft package filter for BAYC
    attrNFTName = `Bored Ape Yacht Club ${req.body.nftTokenId}`;
  }

  // TEST
  // change
  if (req.body.nftTokenType === 'TEST') {
    try {
      // change
      const testAddr = '0x52EA23F2fef28005bEf1DA54e971517C5863a1ad';
      let web3Polygon = createAlchemyWeb3(alchemyURLPolygon, {
        writeProvider: hdWalletEth,
      });
      // change
      const testContract = new web3Polygon.eth.Contract(
        TESTContract.abi,
        testAddr
      );
      const confirmedTokenOwner = await testContract.methods
        .ownerOf(req.body.nftTokenId)
        .call();
      confirmedNFTTokenOwner = confirmedTokenOwner.toLowerCase();
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        // change
        'Error calling Test contract or the token number may not exist.',
        424
      );
      return next(error);
    }

    // set variable as part of nft package filter for BAYC
    // change
    attrNFTName = `Test Token ${req.body.nftTokenId}`;
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // END NFTPACK
  // END NFT OWNER CALL FILTER^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // check if confirmedNFTTokenOwner exists
  if (!confirmedNFTTokenOwner || confirmedNFTTokenOwner == 0) {
    const error = new HttpError(
      'Network error calling NFT project contract or you do not own tokens form this project.',
      424
    );
    return next(error);
  }

  // current client user address
  const user = req.body.user.toLowerCase(); // unconfirmed user set to lower case

  // check if confirmed NFTTokenOwner matches unconfirmed user, return error if addresses do not match
  if (confirmedNFTTokenOwner != user) {
    const error = new HttpError('You do not own this NFT.', 403);
    return next(error);
  }

  // start image creation
  let NFTCID;
  let textOne;
  let textTwo;
  let textThree;
  let textFour;
  let record;
  let modeArray;
  let responseURI;
  let responseImage;

  // START NFTPACK
  // START NFT IMAGE CALL AND RECORD CREATION----------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // BAYC
  if (req.body.nftTokenType === 'BAYC') {
    try {
      // get BAYC metadata for specific token
      const token = req.body.nftTokenId;
      responseURI = await axios.get(
        `https://infura-ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${token}`
      );
    } catch (err) {
      const error = new HttpError(
        'Network error. Could not fetch your NFT metadata.',
        424
      );
      return next(error);
    }

    // get image from ipfs if responseURI available

    if (responseURI) {
      // get image CID for BAYC from metadata string
      NFTCID = responseURI.data.image.substring(7);

      // get image from ipfs
      try {
        responseImage = await axios.get(
          `https://infura-ipfs.io/ipfs/${NFTCID}`,
          {
            responseType: 'arraybuffer',
          }
        );
      } catch (err) {
        const error = new HttpError(
          'Network error. Failed to retrieve your NFT image from ipfs.',
          424
        );
        return next(error);
      }
    }

    // convert response image to Base64
    const returnedB64 = Buffer.from(responseImage.data).toString('base64');

    // format image variable with Base64 image for svg insertion
    const image = `<image
        style='overflow:visible;'
        width='631'
        height='631'
        xlink:href='data:image/png;base64,${returnedB64}'
        transform='matrix(1 0 0 1 18 13.5)'
      ></image>`;

    // word wrap helper function to format message in svg image
    const msgChunks = wordWrap(req.body.message, 50);
    textOne = msgChunks[0];
    textTwo = msgChunks[1];
    textThree = msgChunks[2];
    textFour = msgChunks[3];

    // svg image token id for provenance stack
    const nftTokenId = req.body.nftTokenId;

    // svg image keyword formatted
    const prKeyword = req.body.attrKeyword
      ? ` ${req.body.attrKeyword} =&gt;`
      : '';

    // build record object that will be saved to db
    record = {
      nftTokenType: req.body.nftTokenType,
      nftTokenId: req.body.nftTokenId,
      name: `${req.body.nftTokenType} ${req.body.nftTokenId} Visible Record`,
      description: `${req.body.nftTokenType} #${req.body.nftTokenId} @ ${user} => Provenance stack and ${req.body.nftTokenType}-${req.body.nftTokenId} message is unalterable, freely accessible and transferable => created ${creationDate} by verified NFT owner`,
      message: req.body.message,
      attrNFTName, // attrNFTName is set in the contract call to confirm owner for section above
      textOne,
      textTwo,
      textThree,
      textFour,
      user,
      confirmedNFTTokenOwner,
      prCreateDate: creationDate,
      attrKeyword: req.body.attrKeyword,
      mintTo: req.body.mintTo,
      timeStampImage: timeStampImage,
      pending: false,
      NFTCID,
    };

    // START TEMPLATE FILTER----------------------------------------------------------------------------------------------------------------------
    let ownerAddr = record.confirmedNFTTokenOwner;
    try {
      modeArray = await Promise.all(
        BAYCMaster.map(async (template) => {
          return {
            svg: template(
              image,
              textOne ? textOne : '',
              textTwo ? textTwo : '',
              textThree ? textThree : '',
              textFour ? textFour : '',
              ownerAddr,
              nftTokenId,
              timeStampImage,
              creationDate
            ),
            modeName: template.name,
            DNA: await Web3.utils.soliditySha3(
              { t: 'string', v: record.name },
              { t: 'string', v: record.description },
              {
                t: 'string',
                v: template(
                  image,
                  textOne ? textOne : '',
                  textTwo ? textTwo : '',
                  textThree ? textThree : '',
                  textFour ? textFour : '',
                  ownerAddr,
                  nftTokenId,
                  timeStampImage,
                  creationDate
                ),
              },
              { t: 'string', v: record.message },
              { t: 'string', v: record.prCreateDate },
              { t: 'string', v: record.attrNFTName },
              { t: 'string', v: record.attrKeyword }
            ),
          };
        })
      );

      fs.writeFileSync(__dirname + `/assets/init16.svg`, modeArray[0].svg);

      record.modeDNA = modeArray.map(({ DNA }) => {
        return DNA;
      });
    } catch (err) {
      console.log(err);
      const error = new HttpError('Could not create image mode.', 503);
      return next(error);
    }
  }

  // TEST
  if (req.body.nftTokenType === 'TEST') {
    try {
      // get BAYC metadata for specific token
      const token = req.body.nftTokenId;
      // change
      responseURI = await axios.get(
        `https://infura-ipfs.io/ipfs/QmU5YSkcedgbUrompLMtq7JmoX7k1qsLEsqyhevEYQkJFN/${token}.json`
      );
    } catch (err) {
      const error = new HttpError(
        'Network error. Could not fetch your NFT metadata.',
        424
      );
      return next(error);
    }

    // get image from ipfs if responseURI available
    console.log('responseURI:', responseURI);
    if (responseURI) {
      // get image CID for BAYC from metadata string
      NFTCID = responseURI.data.image.substring(7);

      console.log('TEST Token image CID:', NFTCID);

      // get image from ipfs
      try {
        responseImage = await axios.get(
          `https://infura-ipfs.io/ipfs/${NFTCID}`,
          {
            responseType: 'arraybuffer',
          }
        );
      } catch (err) {
        const error = new HttpError(
          'Network error. Failed to retrieve your NFT image from ipfs.',
          424
        );
        return next(error);
      }
    }

    // convert response image to Base64
    const returnedB64 = Buffer.from(responseImage.data).toString('base64');

    // format image variable with Base64 image for svg insertion
    const image = `<image
        style='overflow:visible;'
        width='631'
        height='631'
        xlink:href='data:image/png;base64,${returnedB64}'
        transform='matrix(1 0 0 1 18 13.5)'
      ></image>`;

    // word wrap helper function to format message in svg image
    const msgChunks = wordWrap(req.body.message, 50);
    textOne = msgChunks[0];
    textTwo = msgChunks[1];
    textThree = msgChunks[2];
    textFour = msgChunks[3];

    // svg image token id for provenance stack
    const nftTokenId = req.body.nftTokenId;

    // svg image keyword formatted
    const prKeyword = req.body.attrKeyword
      ? ` ${req.body.attrKeyword} =&gt;`
      : '';

    // build record object that will be saved to db
    record = {
      nftTokenType: req.body.nftTokenType,
      nftTokenId: req.body.nftTokenId,
      name: `${req.body.nftTokenType} ${req.body.nftTokenId} Visible Record`,
      description: `Mode for ${req.body.nftTokenType} #${req.body.nftTokenId} @ ${user} => Provenance stack and ${req.body.nftTokenType}-${req.body.nftTokenId} message is unalterable, freely accessible and transferable => created ${creationDate} by verified NFT owner`,
      message: req.body.message,
      attrNFTName, // attrNFTName is set in the contract call to confirm owner for section above
      textOne,
      textTwo,
      textThree,
      textFour,
      user,
      confirmedNFTTokenOwner,
      prCreateDate: creationDate,
      attrKeyword: req.body.attrKeyword,
      mintTo: req.body.mintTo,
      timeStampImage: timeStampImage,
      pending: false,
      NFTCID,
    };

    // START TEMPLATE FILTER-
    let ownerAddr = record.confirmedNFTTokenOwner;
    try {
      modeArray = await Promise.all(
        // change
        TESTMaster.map(async (template) => {
          return {
            svg: template(
              image,
              textOne ? textOne : '',
              textTwo ? textTwo : '',
              textThree ? textThree : '',
              textFour ? textFour : '',
              ownerAddr,
              nftTokenId,
              timeStampImage,
              creationDate
            ),
            modeName: template.name,
            DNA: await Web3.utils.soliditySha3(
              { t: 'string', v: record.name },
              { t: 'string', v: record.description },
              {
                t: 'string',
                v: template(
                  image,
                  textOne ? textOne : '',
                  textTwo ? textTwo : '',
                  textThree ? textThree : '',
                  textFour ? textFour : '',
                  ownerAddr,
                  nftTokenId,
                  timeStampImage,
                  creationDate
                ),
              },
              { t: 'string', v: record.message },
              { t: 'string', v: record.prCreateDate },
              { t: 'string', v: record.attrNFTName },
              { t: 'string', v: record.attrKeyword }
            ),
          };
        })
      );

      fs.writeFileSync(__dirname + `/assets/init16.svg`, modeArray[0].svg);
      // fs.writeFileSync(__dirname + `/assets/init15.svg`, modeArray[0].svg);

      record.modeDNA = modeArray.map(({ DNA }) => {
        return DNA;
      });
    } catch (err) {
      console.log(err);
      const error = new HttpError('Could not create image mode.', 503);
      return next(error);
    }
    // change
    console.log('TESTMaster[0] name:', TESTMaster[0].name);
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // END NFTPACK
  // END NFT IMAGE CALL AND RECORD CREATION^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // add record to database
  try {
    // create new record from mongoose model
    const dbRecord = new Record({
      nftTokenType: record.nftTokenType,
      nftTokenId: record.nftTokenId,
      name: record.name,
      description: record.description,
      image: record.image,
      message: record.message,
      user: record.user,
      confirmedNFTTokenOwner: record.confirmedNFTTokenOwner,
      dna: record.dna,
      prCreateDate: record.prCreateDate,
      mintTo: record.mintTo,
      timeStampImage: record.timeStampImage,
      attrKeyword: record.attrKeyword,
      attrNFTName: record.attrNFTName,
      pending: record.pending,
      modeDNA: record.modeDNA,
      textOne: record.textOne,
      textTwo: record.textTwo,
      textThree: record.textThree,
      textFour: record.textFour,
      NFTCID: record.NFTCID,
    });

    console.log('dbRecord:', dbRecord);

    await dbRecord.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Creating record failed.', 500);
    return next(error);
  }

  // return record and built image
  try {
    res.status(201).json({
      user: record.user,
      nftTokenType: record.nftTokenType,
      nftTokenId: record.nftTokenId,
      name: record.name,
      description: record.description,
      image: record.image,
      message: record.message,
      prCreateDate: record.prCreateDate,
      dna: record.dna,
      code: 201,
      attrNFTName: record.attrNFTName,
      attrKeyword: record.attrKeyword,
      modeArray,
    });

    return;
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Network failure. Response object not returned to client.',
      424
    );
    return next(error);
  }
};

// takes in suggestion for new feature and new nft projects and saves them to database, returns nothing to frontend
const suggestion = async (req, res, next) => {
  // user routes express-validator
  const errors = validationResult(req);

  // if express validators errors, next
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed.', 422);
    return next(error);
  }

  try {
    const newSuggestion = new Suggestion({
      nftProject: req.body.nftProject,
      featureSuggestion: req.body.featureSuggestion,
      email: req.body.email,
    });
    await newSuggestion.save();
  } catch (err) {
    const error = new HttpError('Failed to save new suggestion.', 424);
    return next(error);
  }
};

// receives a mail object and stores in db to be sent if double mint is complete
const sendMail = async (req, res, next) => {
  // user routes express-validator
  const errors = validationResult(req);
  console.log(errors);

  // if validation errors, next
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed.', 422);
    return next(error);
  }

  // find record by dna in db
  let dbRecord;
  try {
    dbRecord = await Record.find({ dna: req.body.dna });
  } catch (err) {
    throw new Error('Invalid request to mail.', err);
  }

  // check that record exists and length is 1
  if (dbRecord.length > 1 || !dbRecord) {
    throw new Error('Unique record does not exist.');
  }

  // get object out of array
  dbRecord = dbRecord[0];

  // check user in dbRecord matches sendmail request user
  if (dbRecord.user.toLowerCase() != req.body.userAddress.toLowerCase()) {
    throw new Error('User in db does not match user in mail send request.');
  }

  // check confirmedNFT owner in dbRecord matches sendmail request user
  if (
    dbRecord.confirmedNFTTokenOwner.toLowerCase() !=
    req.body.userAddress.toLowerCase()
  ) {
    throw new Error('NFT owner in db does not match user in mail request.');
  }

  // check req.body token ID match dbrecord token id
  if (dbRecord.nftTokenId != req.body.nftTokenId) {
    throw new Error('Token Ids do not match.');
  }

  // create email object
  const email = {
    emailFrom: req.body.emailFrom,
    emailTo: req.body.emailTo,
    emailReply: req.body.emailReply,
    subject: req.body.subject,
    message: req.body.message,
    nftTokenId: req.body.nftTokenId,
    nftTokenType: req.body.nftTokenType,
    userAddress: req.body.userAddress,
    attrNFTName: req.body.attrNFTName,
    dna: req.body.dna,
    image: req.body.image,
    emailPending: true,
    createTime: Date.now(),
  };

  // create email object db
  const createEmail = new Email({
    emailFrom: email.emailFrom,
    emailTo: email.emailTo,
    emailReply: email.emailReply,
    subject: email.subject,
    message: email.message,
    nftTokenId: email.nftTokenId,
    nftTokenType: email.nftTokenType,
    userAddress: email.userAddress,
    attrNFTName: email.attrNFTName,
    dna: email.dna,
    image: email.image,
    emailPending: email.emailPending,
    createTime: email.createTime,
  });

  // save email model to db
  try {
    await createEmail.save();
  } catch (err) {
    const error = new HttpError('Failed to save email to db.', 503);
    return next(error);
  }

  // return success message after email db object saved
  try {
    res.status(201).json({
      code: 201,
      msg: `Your email will be sent shortly.`,
      emailPending: email.emailPending,
    });
  } catch (err) {
    const error = new HttpError('Email generation failed.', 424);
    return next(error);
  }
};

exports.suggestion = suggestion;
exports.initRecord = initRecord;
exports.initMrr = initMrr;
exports.mrrQueue = mrrQueue;
exports.sendMail = sendMail;
