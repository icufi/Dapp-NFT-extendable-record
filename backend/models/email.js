const mongoose = require('mongoose');

const { Schema } = mongoose;

const emailSchema = new Schema({
  emailFrom: { type: String, required: true },
  emailTo: { type: String, required: true },
  emailReply: { type: String, required: false },
  subject: { type: String, required: false },
  message: { type: String, required: false },
  nftTokenId: { type: String, required: true },
  nftTokenType: { type: String, required: true },
  userAddress: { type: String, required: true },
  attrNFTName: { type: String, required: true },
  dna: { type: String, required: true },
  image: { type: String, required: true },
  emailPending: { type: Boolean, required: true },
  emailCompleteTime: { type: String, required: false },
  mrrTokenId: { type: String, required: false },
  createTime: { type: String, required: true },
  timeOut: { type: Boolean, required: false },
});

module.exports = mongoose.model('Email', emailSchema);
