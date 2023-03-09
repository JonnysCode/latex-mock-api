const express = require('express');
const DocumentController = require('../controllers/documentController');

const documentController = new DocumentController();

const documentRouter = express.Router();

// Create a new document
documentRouter.post(
  '/',
  documentController.createDocument.bind(documentController)
);

// Retrieve all documents
documentRouter.get(
  '/',
  documentController.getAllDocuments.bind(documentController)
);

// Retrieve a single document by id
documentRouter.get(
  '/:id',
  documentController.getDocumentById.bind(documentController)
);

// Update a document by id
documentRouter.put(
  '/:id',
  documentController.updateDocument.bind(documentController)
);

// Delete a document by id
documentRouter.delete(
  '/:id',
  documentController.deleteDocument.bind(documentController)
);

module.exports = documentRouter;
