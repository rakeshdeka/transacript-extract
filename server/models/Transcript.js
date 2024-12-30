const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  videoTitle: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transcript', TranscriptSchema); 