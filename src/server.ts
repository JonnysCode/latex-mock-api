import express, { Request, Response } from 'express';

// Create an instance of Express
const app = express();

// Define an interface for a document object
interface Document {
  id: string;
  name: string;
  content: string;
}

// Define an array of documents
const documents: Document[] = [
  { id: '1', name: 'Document 1', content: 'This is the content of document 1' },
  { id: '2', name: 'Document 2', content: 'This is the content of document 2' },
  { id: '3', name: 'Document 3', content: 'This is the content of document 3' },
];

// Define routes for getting all documents, getting a specific document, creating a new document, updating an existing document, and deleting a document
app.get('/documents', (req: Request, res: Response) => {
  res.send(documents);
});

app.get('/documents/:id', (req: Request, res: Response) => {
  const document = documents.find((doc) => doc.id === req.params.id);

  if (!document) {
    res.status(404).send('Document not found');
  } else {
    res.send(document);
  }
});

app.post('/documents', (req: Request, res: Response) => {
  const newDocument: Document = req.body;

  if (!newDocument.id || !newDocument.name || !newDocument.content) {
    res.status(400).send('Invalid document data');
  } else {
    documents.push(newDocument);
    res.send(newDocument);
  }
});

app.put('/documents/:id', (req: Request, res: Response) => {
  const documentIndex = documents.findIndex((doc) => doc.id === req.params.id);

  if (documentIndex === -1) {
    res.status(404).send('Document not found');
  } else {
    const updatedDocument: Document = req.body;
    documents[documentIndex] = {
      ...documents[documentIndex],
      ...updatedDocument,
    };
    res.send(documents[documentIndex]);
  }
});

app.delete('/documents/:id', (req: Request, res: Response) => {
  const documentIndex = documents.findIndex((doc) => doc.id === req.params.id);

  if (documentIndex === -1) {
    res.status(404).send('Document not found');
  } else {
    const deletedDocument = documents.splice(documentIndex, 1)[0];
    res.send(deletedDocument);
  }
});

// Start the server
app.listen(3003, () => {
  console.log('Server listening on port 3003');
});
