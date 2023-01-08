import { Types } from 'mongoose';

export interface Training {
  _id: Types.ObjectId;
  name: string;
  description: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  reps: number[];
  weight: string;
  tempo: number;
  notes: string;
}