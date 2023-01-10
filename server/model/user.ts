import { model, Schema } from 'mongoose';

import { User } from '../types/user';
import { TrainingSchema } from './training';

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  trainings: {
    type: [String],
  },
});

const User = model<User>('User', UserSchema);

export default User;
