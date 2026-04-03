// models/VerseIndex.js
import mongoose from 'mongoose';

const VerseIndexSchema = new mongoose.Schema({
  verseIds: [String],
  builtAt: { type: Date, default: Date.now },
});

export default mongoose.model('VerseIndex', VerseIndexSchema);