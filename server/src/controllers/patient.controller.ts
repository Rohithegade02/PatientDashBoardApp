import { Request, Response } from 'express';
import { Patient } from '../models/patient.model';
import { ApiError } from '../utils/apiError';
import { AuthenticatedUser } from '../interfaces/auth.interface';

export class PatientController {
  static async getDashboard(req: Request & { user: AuthenticatedUser }, res: Response) {
    try {
      const patient = await Patient.findOne({ userId: req.user.id });
      
      if (!patient) {
        throw new ApiError(404, 'Medical record not found');
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