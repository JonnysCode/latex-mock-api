import express, { Router } from 'express';
import DocumentController from '../controllers/documentController';

const documentController = new DocumentController();

const documentRouter: Router = express.Router();

// Create a new document
documentRouter.post('/', documentController.createDocument);

// Retrieve all documents
documentRouter.get('/', documentController.getAllDocuments);

// Retrieve a single document by id
documentRouter.get('/:id', documentController.getDocumentById);

// Update a document by id
documentRouter.put('/:id', documentController.updateDocument);

// Delete a document by id
documentRouter.delete('/:id', documentController.deleteDocument);

export default documentRouter;
