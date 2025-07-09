import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/auth.interface';
import { UserRole } from '../constants/role';

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.PATIENT
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);