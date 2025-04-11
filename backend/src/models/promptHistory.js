const mongoose = require('mongoose');

const promptHistorySchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  generatedFiles: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PromptHistory', promptHistorySchema); 