const mongoose = require('mongoose');

const { Schema } = mongoose;

const recordSchema = new Schema({
  nftTokenType: { type: String, required: true },
  nftTokenId: { type: String, required: true },
  attrNFTName: { type: String, required: true },
  prTokenId: { type: String, required: false },
  mrrTokenId: { type: String, required: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  message: { type: String, required: false },
  image: { type: String, required: false },
  timeStampImage: { type: String, required: true },
  prCreateDate: { type: String, required: false },
  attrKeyword: { type: String, required: false },
  attrCreatorAddress: { type: String, required: false },
  mintTo: { type: String, required: false },
  prTemplate: { type: String, required: false },
  user: { type: String, required: true },
  confirmedNFTTokenOwner: { type: String, required: true },
  PubTrxHash: { type: String, required: false },
  mrrTrxHash: { type: String, required: false },
  pending: { type: Boolean, required: true },
  pendingTime: { type: String, required: false },
  mrrTimeout: { type: Boolean, required: false },
  mintingComplete: { type: Boolean, required: false },
  mintingError: { type: String, required: false },
  mrrTrxError: { type: String, required: false },
  failedChecks: { type: String, required: false },
  mrrMintWhere: { type: String, required: false },
  modeDNA: [String],
  textOne: { type: String, required: false },
  textTwo: { type: String, required: false },
  textThree: { type: String, required: false },
  textFour: { type: String, required: false },
  NFTCID: { type: String, required: false },
  modeUsed: { type: String, required: false },
  dna: { type: String, required: false },
});

module.exports = mongoose.model('Record', recordSchema);
