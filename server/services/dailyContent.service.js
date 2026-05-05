import axios from "axios";
import Anthropic from "@anthropic-ai/sdk";
import DailyContent from "../models/DailyContent.js";
import dotenv from "dotenv";
import { ensureVerseIndex } from "./verseIndex.service.js";
import { getDailyVerseId } from "../utils/seededRandom.js";
import { generateWithDeepseek } from "./deepseek.service.js";


dotenv.config();

const BIBLE_API_KEY = process.env.BIBLE_API_KEY;
const BIBLE_ID = process.env.BIBLE_ID; // NIV from API
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
// const anthropic = new Anthropic(ANTHROPIC_API_KEY);

const fetchVerseOfTheDay = async (date) => {
  // pull index from MongoDB
  const index = await ensureVerseIndex();

  // Deterministic random selection for this date
  const verseId = getDailyVerseId(index.verseIds, date);

  const res = await axios.get(
    `https://rest.api.bible/v1/bibles/${BIBLE_ID}/verses/${verseId}`,
    {
      headers: { "api-key": BIBLE_API_KEY },
      params: {
        "content-type": "text",
        "include-verse-numbers": "false",
        "include-titles": "false",
      },
    },
  );

  const { id, bookId, chapterId, content, reference } = res.data.data;

  return {
    reference,
    text: content.trim(),
    bookId,
    chapter: Number(chapterId.split(".")[1]),
    verse: Number(id.split(".")[2]),
    verseId: id,
  };
};

// const fetchDevotional = async () => {
//   const res = await axios.get(
//     "https://beta.ourmanna.com/api/v1/get/?format=json&order=daily",
//   );
//   const { text, reference, version } = res.data.verse.details;
//   return { text, reference, version };
// };

const fetchDevotional = async (verse) => {
  const prompt = `
    You are writing a daily devotional for a Bible app.

    You have one input: 
    1. Today's verse: '${verse.reference} - ${verse.text}'

    Your task: 
    - Write a short devotional (3-4 paragraphs) that is clearly grounded in today's verse
    - Open with a direct reference to the verse
    - Close with a one-sentence prayer or reflection prompt
    - Tone: warm, accessible, and non-denominational
    - Return ONLY valid JSON in this exact shape, no markdown, no preamble:
    {
        "title": "...",
        "body": "...",
        "reflection": "..."
    }
    `;

  

  const raw = await generateWithDeepseek(prompt)
  console.log(raw)
  //   return JSON.parse(raw);
  try {
    return JSON.parse(sanitizeJSON(raw));
  } catch (e) {
    console.error("Failed to parse AI devotional JSON:", raw, e);
    return {
      title: verse.reference,
      body: "A devotional could not be generated today.",
      reflection:
        "Take a moment to reflect on this verse and how it speaks to you today.",
    };
  }
};

export const getOrFetchDailyContent = async () => {
  const today = new Date().toISOString().split("T")[0];
  const cached = await DailyContent.findOne({ date: today });
  if (cached) return cached;

  const wordOfTheDay = await fetchVerseOfTheDay(today);
  const devotional = await fetchDevotional(wordOfTheDay);

  const doc = await DailyContent.create({
    date: today,
    wordOfTheDay,
    devotional,
  });

  return doc;
};

// sanitize the JSON response when necessary -> catch edge cases
const sanitizeJSON = (raw) => {
  return raw
    .trim()
    // Strip markdown code fences if model adds them
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    // Replace single-quoted keys/values with double quotes
    .replace(/'/g, '"')
    // Remove trailing commas before } or ]
    .replace(/,\s*([}\]])/g, "$1");
};

