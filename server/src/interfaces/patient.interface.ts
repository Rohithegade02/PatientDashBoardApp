import mongoose, { Document } from 'mongoose';
import { IUser } from './auth.interface';

export interface IPatientMedical extends IUser, Document {
    userId: mongoose.Types.ObjectId;
  patientId: string;
  currentPlan: string;
  nextDeliveryDate: Date;
  remainingMedication: number;
  status: 'active' | 'inactive';
  billingStatus: 'ok' | 'pending' | 'overdue';
  createdBy: string;
  updatedAt: Date;
}

