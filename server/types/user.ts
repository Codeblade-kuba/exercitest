import { Types } from 'mongoose';
import { Training } from './training';

export interface UserBlueprint {
  name: string;
  email: string;
  password: string;
  salt?: string;
}

export interface User extends UserBlueprint {
  _id: Types.ObjectId;
  salt: string;
  trainings: [Types.ObjectId];
}

export type UserPayload = {
  user: {
    id: Types.ObjectId;
    name: string;
  };
  expiresAt: string;
};
