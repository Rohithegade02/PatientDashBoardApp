import { Document } from 'mongoose'

export interface IUser {
    email: string
    password: string
}

export interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>
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
