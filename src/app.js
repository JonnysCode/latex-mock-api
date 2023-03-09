const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config/dbConfig');
const documentRoutes = require('./routes/documentRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use('/documents', documentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3003;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
