import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
export { documentSchema };
