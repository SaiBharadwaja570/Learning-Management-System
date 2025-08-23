import mongoose from 'mongoose'
import User from '../types/user.types'

const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "instructor", "mentor"],
        default: "student"
    }
})

const User = mongoose.model("User", userSchema)