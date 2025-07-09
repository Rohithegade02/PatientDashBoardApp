import { Request, Response, NextFunction } from 'express'
import authService from '../services/auth.service'
import logger from '../utils/logger'

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const user = await authService.registerUser(email, password)
            res.status(201).json({
                success: true,
                data: { email: user.email },
            })
        } catch (error) {
            logger.error(`Registration error: ${error}`)
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            console.log('email backend', email)
            console.log('password backend', password)
            const token = await authService.loginUser(email, password)
            res.status(200).json({
                success: true,
                data: { token, user: { email } },
            })
        } catch (error) {
            logger.error(`Login error: ${error}`)
            next(error)
        }
    }
}

export default new AuthController()
