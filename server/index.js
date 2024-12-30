const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const transcriptRoutes = require('./routes/transcript');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/transcript', transcriptRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 