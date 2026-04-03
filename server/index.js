import express from "express";
import cors from 'cors'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import connectDB from "./config/dbConn.js";
import authRoutes from './routes/auth.routes.js'
import dailyRoutes from './routes/daily.routes.js'
import './jobs/dailyContent.job.js' // -> just needs to be imported to start the cron job

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Elevate API',
            version: '1.0.0',
            description: 'API documentation for the Elevate mobile app'
        },
    },
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

const PORT = 3500

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => res.json({message: 'Welcome to the Elevate API.'}))
app.use('/auth', authRoutes)
app.use('/daily-readings', dailyRoutes)

mongoose.connection.once('open', () => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})