import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/apiError'
import logger from '../utils/logger'

export const authenticate = (
    req: Request & { user: { id: string } },
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            throw new ApiError(401, 'Authentication required')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string
        }
        req.user = { id: decoded.id.toString() }
        next()
    } catch (error) {
        logger.error(`Authentication error: ${error}`)
        next(error)
    }
}
