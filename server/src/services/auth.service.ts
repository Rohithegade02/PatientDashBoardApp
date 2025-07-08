import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { IUser, IUserDocument } from '../interfaces/auth.interface'
import { ApiError } from '../utils/apiError'
import logger from '../utils/logger'

class AuthService {
    async registerUser(email: string, password: string): Promise<IUser> {
        try {
            if (await User.findOne({ email })) {
                throw new ApiError(400, 'Email already in use')
            }

            const user = await User.create({ email, password })
            return user.toObject() as IUser
        } catch (error) {
            logger.error(`Error registering user: ${error}`)
            throw error
        }
    }

    async loginUser(email: string, password: string): Promise<string> {
        try {
            const user = (await User.findOne({ email })) as IUserDocument
            if (!user) {
                throw new ApiError(401, 'Invalid credentials')
            }

            const isMatch = await user.comparePassword(password)
            if (!isMatch) {
                throw new ApiError(401, 'Invalid credentials')
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            )

            return token
        } catch (error) {
            logger.error(`Error logging in user: ${error}`)
            throw error
        }
    }
}

export default new AuthService()
