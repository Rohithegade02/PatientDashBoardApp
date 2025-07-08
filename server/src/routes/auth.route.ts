import { Router } from 'express'
import authController from '../controllers/auth.controller'
import { errorHandler } from '../middlewares/error.middleware'

const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

router.use(errorHandler)

export default router
