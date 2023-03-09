const { v4: uuidv4 } = require('uuid');
const Document = require('../models/documentModel');

class DocumentController {
  // Get all documents
  async getAllDocuments(req, res, next) {
    try {
      const documents = await Document.find({});
      res.status(200).json(documents);
    } catch (err) {
      next(err);
    }
  }

  // Get a document by id
  async getDocumentById(req, res, next) {
    const { id } = req.params;
    try {
      const document = await Document.findOne({ id: id });
      if (!document) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }
      res.status(200).json(document);
    } catch (err) {
      next(err);
    }
  }

  // Create a new document
  async createDocument(req, res, next) {
    const { name, content } = req.body;
    const id = uuidv4();
    try {
      const document = new Document({
        id,
        name,
        content,
      });
      await document.save();
      res.status(201).json(document);
    } catch (err) {
      next(err);
    }
  }

  // Update an existing document by id
  async updateDocument(req, res, next) {
    const { id } = req.params;
    const { name, content } = req.body;
    try {
      const updatedDocument = await Document.findOneAndUpdate(
        { id: id },
        { name, content, updated_at: Date.now() },
        { new: true }
      );
      if (!updatedDocument) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }
      res.status(200).json(updatedDocument);
    } catch (err) {
      next(err);
    }
  }

  // Delete a document by id
  async deleteDocument(req, res, next) {
    const { id } = req.params;
    try {
      const deletedDocument = await Document.findOneAndDelete({ id: id });
      if (!deletedDocument) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DocumentController;
