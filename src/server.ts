import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

import Document from './models/Document';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const uri = process.env.DATABASE_URL || process.env.DEV_DB_URL;
console.log('Connecting to MongoDB:', uri);

mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB on ', uri);
});

// Get a document by ID
app.get('/documents/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const document = await Document.findOne({ id: id });
    if (document) {
      res.status(200).send(document.content);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (err) {
    console.error('Failed to get document', err);
    res.status(500).send('Internal server error');
  }
});

// Create a new document
app.post('/documents', async (req: Request, res: Response) => {
  try {
    const document = new Document({
      id: uuidv4(),
      name: req.body.name,
      content: req.body.content,
    });
    const result = await document.save();
    res.status(201).send(result.id);
  } catch (err) {
    console.error('Failed to create document', err);
    res.status(500).send('Internal server error');
  }
});

// Update a document by ID
app.put('/documents/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await Document.updateOne(
      { id: id },
      { $set: { content: req.body.content } }
    );
    if (result.matchedCount === 1) {
      res.status(200).send('Document updated');
    } else {
      res.status(404).send('Document not found');
    }
  } catch (err) {
    console.error('Failed to update document', err);
    res.status(500).send('Internal server error');
  }
});

// Delete a document by ID
app.delete('/documents/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await Document.deleteOne({ id: id });
    if (result.deletedCount === 1) {
      res.status(200).send('Document deleted');
    } else {
      res.status(404).send('Document not found');
    }
  } catch (err) {
    console.error('Failed to delete document', err);
    res.status(500).send('Internal server error');
  }
});

// Start the server
const port = 3003;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
