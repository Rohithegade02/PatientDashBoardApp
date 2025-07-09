import { Request, Response } from 'express';
import { Patient } from '../../models/patient.model';
import { ApiError } from '../../utils/apiError';
import { User } from '../../models/user.model';
import { AuthenticatedUser } from '../../interfaces/auth.interface';

export class AdminPatientController {
  static async createMedicalRecord(req: Request & { user: AuthenticatedUser }, res: Response) {
    try {
      const { userId, patientId, currentPlan, nextDeliveryDate, remainingMedication } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      if (user.role !== 'patient') {
        throw new ApiError(400, 'Only patients can have medical records');
      }

      if (await Patient.findOne({ patientId })) {
        throw new ApiError(400, 'Patient ID already exists');
      }

      const patient = await Patient.create({
        userId,
        patientId,
        currentPlan,
        nextDeliveryDate,
        remainingMedication,
        createdBy: req.user.id
      });

      res.status(201).json({
        success: true,
        data: patient
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  static async updateMedicalRecord(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const patient = await Patient.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      );

      if (!patient) {
        throw new ApiError(404, 'Patient record not found');
      }

      res.json({
        success: true,
        data: patient
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }
}