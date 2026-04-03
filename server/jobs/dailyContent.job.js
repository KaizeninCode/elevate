import cron from 'node-cron'
import { getOrFetchDailyContent } from '../services/dailyContent.service.js'

// runs at 00:01 every day
cron.schedule('1 0 * * *', async () => {
    console.log('[CRON] Warming daily content cache...')
    try {
        await getOrFetchDailyContent()
        console.log('[CRON] Daily content cached successfully.')
    } catch (error) {
        console.error('[CRON] Failed to cache daily content', error.message)
    }
}) 
