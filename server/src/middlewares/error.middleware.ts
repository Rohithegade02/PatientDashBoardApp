import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/apiError'
import logger from '../utils/logger'

export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        logger.error(`API Error: ${err.statusCode} - ${err.message}`)
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        })
    }

    logger.error(`Unexpected Error: ${err.message}`)
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    })
}
