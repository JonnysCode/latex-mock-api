const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config/dbConfig');
const documentRoutes = require('./routes/documentRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

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
    console.log('Connected to database: ', MONGODB_URI);
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });