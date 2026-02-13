require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const portfolioRoutes = require('./routes/portfolio');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
      tls: true,
  retryWrites: true,
  w: 'majority'
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/portfolio', portfolioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));