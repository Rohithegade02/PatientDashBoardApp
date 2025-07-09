import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/apiError'
import logger from '../utils/logger'
import { User } from '../models/user.model'
import { AuthenticatedUser } from '../interfaces/auth.interface'


export const authenticate = async (
    req: Request & { user: AuthenticatedUser },
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
    
        if (!token) {
          throw new ApiError(401, 'Authentication required');
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id).select('-password');
    
        if (!user) {
          throw new ApiError(401, 'Invalid token - user not found');
        }
    
        req.user = user as any;
        next();
    } catch (error) {
        logger.error(`Authentication error: ${error}`)
        next(error)
    }
}
