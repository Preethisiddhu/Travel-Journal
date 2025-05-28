import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
}, { timestamps: true });

const Journal = mongoose.model('Journal', JournalSchema);
export default Journal;
