import { Router } from 'express'
import patientController from '../controllers/patient.controller'
import { authenticate } from '../middlewares/auth.middleware'
import { errorHandler } from '../middlewares/error.middleware'

const router = Router()

router.use(authenticate)

router.get('/dashboard', patientController.getDashboard)
router.patch('/update', patientController.updatePatient)

router.use(errorHandler)

export default router
