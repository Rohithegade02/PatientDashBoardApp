import { Request, Response, NextFunction } from 'express'
import patientService from '../services/patient.service'
import logger from '../utils/logger'

class PatientController {
    async getDashboard(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await patientService.getPatientDashboard(
                req.user.id
            )
            res.status(200).json({
                success: true,
                data: patient,
            })
        } catch (error) {
            logger.error(`Get dashboard error: ${error}`)
            next(error)
        }
    }

    async updatePatient(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await patientService.updatePatient(
                req.user.id,
                req.body
            )
            res.status(200).json({
                success: true,
                data: patient,
            })
        } catch (error) {
            logger.error(`Update patient error: ${error}`)
            next(error)
        }
    }
}

export default new PatientController()
