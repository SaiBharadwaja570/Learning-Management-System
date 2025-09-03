import mongoose from 'mongoose'
import UserTypes from '../types/user.types'

const userSchema = new mongoose.Schema<UserTypes>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "instructor", "mentor"],
        default: "student"
    }
})

const User = mongoose.model("User", userSchema)

export default User;