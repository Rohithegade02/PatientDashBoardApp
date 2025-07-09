import { Document } from 'mongoose';
import { UserRole } from '../constants/role';

export interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth?: Date;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}   

export interface AuthenticatedUser {
    id: string;
    role: string;
  }
// Extend Express Request type to include user property
declare global {
    namespace Express {
        interface Request {
            user: {
                id: string
            }
        }
    }
}
