import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'regular'
    }
})

export const userModel = mongoose.model('user', userSchema);