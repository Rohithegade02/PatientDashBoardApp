import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/auth.route'
import patientRoutes from './routes/patient.route'
import { errorHandler } from './middlewares/error.middleware'
import logger from './utils/logger'

const app = express()

// Middlewares
app.use(cors({
    origin: ['http://localhost:19006', 'http://10.0.2.2:19006'], // Add emulator IP
    credentials: true,
}));
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/patients', patientRoutes)

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' })
})

// Error handling
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
    logger.error(`404 - Not Found - ${req.originalUrl}`)
    res.status(404).json({ success: false, message: 'Not Found' })
})

export default app
