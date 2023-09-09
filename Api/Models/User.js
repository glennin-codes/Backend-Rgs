import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: String,
  location: String,
  phone:String,
  email: String,
  password: String,
  photo:String,
 
  role: {
    type: String,
    enum: ['master-admin', 'admin', 'user'],
    default: 'user', // Default role for new users
  },
});

export default model('User', userSchema);
