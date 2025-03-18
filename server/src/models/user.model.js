import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, forneça um nome!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Por favor, forneça o email!'],
    unique: true,
    trim: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Por favor, forneça um email válido!']
  },
  password: {
    type: String,
    required: [true, 'Por favor, forneça uma senha!']
  },
  photo: {
    type: String,
    default: 'https://avatars.githubusercontent.com/u/19819005?v=4'
  },
  bio: {
    type: String,
    default: 'Sou um novo usuário'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, minimize: true });

const User = mongoose.model('User', userSchema);
export default User;
