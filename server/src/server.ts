import app from './app'
import connectDB from './config/db'
import logger from './utils/logger'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`)
        })
    } catch (error) {
        logger.error(`Failed to start server: ${error}`)
        process.exit(1)
    }
}

startServer()
