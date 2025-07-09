import Patient from '../models/patient.model'
import { IPatient, IPatientDocument } from '../interfaces/patient.interface'
import { ApiError } from '../utils/apiError'
import logger from '../utils/logger'

class PatientService {
    async createPatient(patientData: IPatient): Promise<IPatientDocument> {
        try {
            const patient = await Patient.create(patientData)
            return patient.toObject() as IPatientDocument
        } catch (error) {
            logger.error(`Error creating patient: ${error}`)
            throw error
        }
    }

    async getPatientDashboard(userId: string): Promise<IPatientDocument> {
        try {
            const patient = await Patient.findOne({ userId })
            if (!patient) {
                throw new ApiError(404, 'Patient not found')
            }
            return patient.toObject() as IPatientDocument
        } catch (error) {
            logger.error(`Error getting patient dashboard: ${error}`)
            throw error
        }
    }

    async updatePatient(
        userId: string,
        updateData: Partial<IPatient>
    ): Promise<IPatientDocument> {
        try {
            const patient = await Patient.findOneAndUpdate(
                { userId },
                updateData,
                { new: true, runValidators: true }
            )
            if (!patient) {
                throw new ApiError(404, 'Patient not found')
            }
            return patient.toObject() as IPatientDocument
        } catch (error) {
            logger.error(`Error updating patient: ${error}`)
            throw error
        }
    }

    async createPatientsInBulk(patientsData: IPatient[]): Promise<IPatientDocument[]> {
        try {
            const patients = await Patient.insertMany(patientsData)
            return patients.map(patient => patient.toObject()) as IPatientDocument[]
        } catch (error) {
            logger.error(`Error creating patients in bulk: ${error}`)
            throw error
        }
    }
}

export default new PatientService()
