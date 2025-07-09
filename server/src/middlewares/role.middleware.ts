import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../constants/role';
import { ApiError } from '../utils/apiError';

export const requireRole = (roles: UserRole[]) => {
  return (req: Request & { user: { id: string; role: string } }, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role as UserRole)) {
      throw new ApiError(403, 'Forbidden: Insufficient permissions');
    }
    next();
  };
};