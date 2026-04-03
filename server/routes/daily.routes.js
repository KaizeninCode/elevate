import express from "express";
import { getOrFetchDailyContent } from "../services/dailyContent.service.js";

const router = express.Router();

/**
 * @swagger
 * /daily-readings:
 *   get:
 *     tags:
 *       - Daily Readings
 *     summary: Get today's verse and devotional
 *     description: Fetches today's verse and a corresponding devotional.
 *     
 *             
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 date: '2026-04-02'
 *                 wordOfTheDay: {...}
 *                 devotion: {...}
 *       500:
 *         description: Failed
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: 'Failed to fetch daily content'
 */
router.get("/", async (req, res) => {
  try {
    const content = await getOrFetchDailyContent();
    res.json({ success: "true", data: content });
  } catch (error) {
    console.error("Daily content fetch failed:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Could not load daily content." });
  }
});

export default router;
