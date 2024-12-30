const express = require('express');
const router = express.Router();
const transcriptController = require('../controllers/transcriptController');

router.post('/extract', transcriptController.getTranscript);

module.exports = router; 