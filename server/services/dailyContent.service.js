import axios from "axios";
import Anthropic from "@anthropic-ai/sdk";
import DailyContent from "../models/DailyContent.js";
import dotenv from "dotenv";
import { ensureVerseIndex } from "./verseIndex.service.js";
import { getDailyVerseId } from "../utils/seededRandom.js";

dotenv.config();

const BIBLE_API_KEY = process.env.BIBLE_API_KEY;
const BIBLE_ID = process.env.BIBLE_ID; // NIV from API
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const anthropic = new Anthropic(ANTHROPIC_API_KEY);

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

const fetchDevotional = async () => {
  const res = await axios.get(
    "https://beta.ourmanna.com/api/v1/get/?format=json&order=daily",
  );
  const { text, reference, version } = res.data.verse.details;
  return { text, reference, version };
};

const harmonizeDevotional = async (verse, rawDevotional) => {
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
        'title': '...',
        'body': '...',
        'reflection': '...',
    }
    `;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = message.content[0].text.trim();
  return JSON.parse(raw);
};

export const getOrFetchDailyContent = async () => {
  const today = new Date().toISOString().split("T")[0];
  const cached = await DailyContent.findOne({ date: today });
  if (cached) return cached;

  // fetch verse + raw devotional in parallel
  const [wordOfTheDay, rawDevotional] = await Promise.all([
    fetchVerseOfTheDay(today),
    fetchDevotional(),
  ]);

  //  harmonize - A rewrites devotional around the verse
  let harmonized;
  try {
    harmonized = await harmonizeDevotional(wordOfTheDay, rawDevotional);
  } catch {
    harmonized = {
      title: rawDevotional.title,
      body: rawDevotional.body,
      reflection:
        "Take a moment to reflect on this verse and how it speaks to you today.",
    };
  }
  const doc = await DailyContent.create({
    date: today,
    wordOfTheDay,
    devotional: {
      title: harmonized.title,
      body: harmonized.body,
      reflection: harmonized.reflection,
      attribution: 'Inspired by OurManna.',
    },
  });

  return doc;
};
