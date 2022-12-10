import { Types } from 'mongoose';

export interface UserBlueprint {
  name: string;
  email: string;
  password: string;
  salt?: string;
}

export interface User extends UserBlueprint {
  _id: Types.ObjectId;
  salt: string;
}

export type UserPayload = {
  user: {
    id: Types.ObjectId;
  };
};
