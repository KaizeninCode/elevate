const seededRandom = (seed) => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

function dateToSeed(dateStr) {
  if (typeof dateStr !== "string") {
    throw new Error(
      "dateToSeed: dateStr must be a string, got " + typeof dateStr,
    );
  }
  return dateStr.split("-").reduce((acc, part) => acc * 1000 + Number(part), 0);
}

export const getDailyVerseId = (verseIds, dateStr) => {
  const seed = dateToSeed(dateStr);
  const rng = seededRandom(seed);
  const index = Math.floor(rng * verseIds.length);
  return verseIds[index];
};
