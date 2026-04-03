// models/DailyContent.js
import mongoose from 'mongoose';

const DailyContentSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // "2026-04-02"
  wordOfTheDay: {
    reference: String,    // "John 3:16"
    text: String,         // full verse text
    bookId: String,       // "JHN"
    chapter: Number,
    verse: Number,
  },
  devotional: {
    title: String,
    body: String,         // the summary text
    reflection: String,         // the closing prayer/reflection prompt
    attribution: String,  // source name if the API provides one
  },
  fetchedAt: { type: Date, default: Date.now },
});

export default mongoose.model('DailyContent', DailyContentSchema);