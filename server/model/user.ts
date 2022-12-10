import { model, Schema } from 'mongoose';

import { User } from '../types/user';

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
});

const User = model<User>('User', UserSchema);

export default User;
