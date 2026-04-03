import axios from "axios";
import VerseIndex from "../models/VerseIndex.js";

const BIBLE_ID = process.env.BIBLE_ID;
const BIBLE_API_KEY = process.env.BIBLE_API_KEY;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAllVerseIds = async () => {
  const verseIds = [];

  // 1. Get all books
  const booksRes = await axios.get(
    `https://rest.api.bible/v1/bibles/${BIBLE_ID}/books`,
    { headers: { "api-key": BIBLE_API_KEY } },
  );
  const books = booksRes.data.data;
  console.log(`[INDEX] Found ${books.length} books.`);

  // 2. For ach book, get its chapters
  for (const book of books) {
    const chaptersRes = await axios.get(`https://rest.api.bible/v1/bibles/${BIBLE_ID}/books/${book.id}/chapters`, {headers: {'api-key': BIBLE_API_KEY}})

    const chapters = chaptersRes.data.data.filter(c => c.number !== 'intro')

    // 3 For each chapter, get its verses
    for (const chapter of chapters) {
        const versesRes = await axios.get(`https://rest.api.bible/v1/bibles/${BIBLE_ID}/chapters/${chapter.id}/verses`, {headers: {'api-key': BIBLE_API_KEY}})

        const verses = versesRes.data.data
        verses.forEach(v => verseIds.push(v.id))

        console.log(`[INDEX] ${chapter.id} -> ${verses.length} verses (total: ${verseIds.length})`)

        await delay(100)
    }
  }

  return verseIds
};

export const ensureVerseIndex = async () => {
    // cache hit, return immediately
    const existing = await VerseIndex.findOne()
    if (existing) return existing

    // cache miss, build index
    console.log('[INDEX] No verse index found. Building...')
    const verseIds = await fetchAllVerseIds()
    console.log(`[INDEX] Done. Total verses indexed: ${verseIds.length}`)

    return VerseIndex.create({verseIds})
}

export const rebuildVerseIndex = async () => {
  console.log('[INDEX] Rebuilding verse index...');
  await VerseIndex.deleteMany({});
  const verseIds = await fetchAllVerseIds();
  return VerseIndex.create({ verseIds });
}
