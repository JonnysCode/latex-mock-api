const Document = require('../models/documentModel');

function toDocumentJson(document) {
  const { _id, ...rest } = document.toJSON();
  return { id: _id, ...rest };
}

class DocumentController {
  async createDocument(req, res, next) {
    try {
      const { name, content } = req.body;
      const document = await Document.create({ name, content });
      res.status(201).json({ success: true, data: toDocumentJson(document) });
    } catch (error) {
      next(error);
    }
  }

  async getAllDocuments(req, res, next) {
    try {
      const documents = await Document.find();
      res.status(200).json({
        success: true,
        data: documents.map(toDocumentJson),
      });
    } catch (error) {
      next(error);
    }
  }

  async getDocumentById(req, res, next) {
    try {
      const { id } = req.params;
      const document = await Document.findById(id);
      if (!document) {
        return res
          .status(404)
          .json({ success: false, message: 'Document not found' });
      }
      res.status(200).json({ success: true, data: toDocumentJson(document) });
    } catch (error) {
      next(error);
    }
  }

  async updateDocument(req, res, next) {
    try {
      const { id } = req.params;
      const { name, content } = req.body;
      const updatedDocument = await Document.findByIdAndUpdate(
        id,
        { name, content, updated_at: Date.now() },
        { new: true }
      );
      if (!updatedDocument) {
        return res
          .status(404)
          .json({ success: false, message: 'Document not found' });
      }
      res
        .status(200)
        .json({ success: true, data: toDocumentJson(updatedDocument) });
    } catch (error) {
      next(error);
    }
  }

  async deleteDocument(req, res, next) {
    try {
      const { id } = req.params;
      const deletedDocument = await Document.findByIdAndDelete(id);
      if (!deletedDocument) {
        return res
          .status(404)
          .json({ success: false, message: 'Document not found' });
      }
      res
        .status(200)
        .json({ success: true, data: toDocumentJson(deletedDocument) });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DocumentController;
