import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI } from './config/dbConfig';
import documentRoutes from './routes/documentRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/documents', documentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3003;

console.log('URI: ', MONGODB_URI);

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
