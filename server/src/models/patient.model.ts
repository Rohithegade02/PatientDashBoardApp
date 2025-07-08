import mongoose from 'mongoose'
import { IPatient, IPatientDocument } from '../interfaces/patient.interface'

const patientSchema = new mongoose.Schema<IPatient>({
    userId: {
        type: String,
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
        unique: true,
    },
    currentPlan: {
        type: String,
        required: true,
    },
    nextDeliveryDate: {
        type: Date,
        required: true,
    },
    remainingMedication: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    billingStatus: {
        type: String,
        enum: ['ok', 'pending', 'overdue'],
        default: 'ok',
    },
})

const Patient = mongoose.model<IPatientDocument>('Patient', patientSchema)

export default Patient
