import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  id: String,
  name: String,
  content: String,
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
export { documentSchema };
