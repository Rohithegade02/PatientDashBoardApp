import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { ApiError } from '../utils/apiError';
import { UserRole } from '../constants/role';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, fullName, isAdmin } = req.body;
  
      const role = isAdmin ? UserRole.ADMIN : UserRole.PATIENT;
      
      if (await User.findOne({ email })) {
        throw new ApiError(400, 'Email already in use');
      }
  
      const user = await User.create({
        email,
        password,
        fullName,
        role, // Set role based on isAdmin
        createdAt: new Date()
      });
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({
        success: true,
        token,
        email: user.email,
        isAdmin: user.role === UserRole.ADMIN, // Boolean response
        user: {
          _id: user._id,
          fullName: user.fullName
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );

      const userData = user.toObject();
      delete userData.password;

      res.json({
        success: true,
        token,
        user: userData
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