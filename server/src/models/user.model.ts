import mongoose from 'mongoose'
import { IUser, IUserDocument } from '../interfaces/auth.interface'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema<IUserDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error as Error)
    }
})

userSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model<IUserDocument>('User', userSchema)

export default User
