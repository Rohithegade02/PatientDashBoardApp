import mongoose from 'mongoose';
import { IPatientMedical } from '../interfaces/patient.interface';

const patientSchema = new mongoose.Schema<IPatientMedical>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientId: {
    type: String,
    required: true,
    unique: true
  },
  currentPlan: {
    type: String,
    required: true
  },
  nextDeliveryDate: {
    type: Date,
    required: true
  },
  remainingMedication: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  billingStatus: {
    type: String,
    enum: ['ok', 'pending', 'overdue'],
    default: 'ok'
  },
  createdBy: {
    type: String,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export const Patient = mongoose.model<IPatientMedical>('Patient', patientSchema);       