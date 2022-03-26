const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const suggestionSchema = new Schema({
  nftProject: { type: String, required: false },
  featureSuggestion: { type: String, required: false },
  email: { type: String, required: false },
});

module.exports = mongoose.model('suggestion', suggestionSchema);
