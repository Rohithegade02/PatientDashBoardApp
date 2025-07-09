import { Router } from 'express'
import { PatientController } from '../controllers/patient.controller'   
import { authenticate } from '../middlewares/auth.middleware'
import { errorHandler } from '../middlewares/error.middleware'

const router = Router()

router.use(authenticate)

router.get('/dashboard', PatientController.getDashboard)

router.use(errorHandler)

export default router
