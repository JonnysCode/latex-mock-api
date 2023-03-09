import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Document from '../models/documentModel';

class DocumentController {
  // Get all documents
  async getAllDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const documents = await Document.find({});
      res.status(200).json(documents);
    } catch (err) {
      next(err);
    }
  }

  // Get a document by id
  async getDocumentById(req: Request, res: Response, next: NextFunction) {
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
  async createDocument(req: Request, res: Response, next: NextFunction) {
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
  async updateDocument(req: Request, res: Response, next: NextFunction) {
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
  async deleteDocument(req: Request, res: Response, next: NextFunction) {
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

export default DocumentController;
