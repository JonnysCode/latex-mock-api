import mongoose from 'mongoose';

export const MONGODB_URI =
  process.env.DATABASE_URL ||
  process.env.DEV_DB_URL ||
  'mongodb://localhost:27017/latex-api-db';
