import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI || 'mongodb://mongo:27017/latex-api';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}
connectToDatabase();

// Get a document by ID
app.get('/documents/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const collection = client.db().collection('documents');
    const document = await collection.findOne({ _id: new ObjectId(id) });
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
    const collection = client.db().collection('documents');
    const result = await collection.insertOne(req.body);
    res.status(201).send(result.insertedId);
  } catch (err) {
    console.error('Failed to create document', err);
    res.status(500).send('Internal server error');
  }
});

// Update a document by ID
app.put('/documents/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const collection = client.db().collection('documents');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
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
    const collection = client.db().collection('documents');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
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
