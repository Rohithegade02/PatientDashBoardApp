import { Document } from 'mongoose'

export interface IPatient {
    userId: string
    fullName: string
    patientId: string
    currentPlan: string
    nextDeliveryDate: Date
    remainingMedication: number
    status: 'active' | 'inactive'
    billingStatus: 'ok' | 'pending' | 'overdue'
}

export interface IPatientDocument extends IPatient, Document {}
