import 'dotenv/config'
import mongoose from 'mongoose'
import { ensureVerseIndex } from '../services/verseIndex.service.js'

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('[SETUP] Connected to MongoDB.')

        await ensureVerseIndex()
    } catch (error) {
        console.error('[SETUP] Failed:', error.message)
    } finally {
        await mongoose.disconnect()
    }
}

run()