import { model, Schema } from 'mongoose';

import { Training, Exercise } from '../types/training';

function arrayIsEmpty(arr: []) {
  return arr.length > 0;
}

const ExerciseSchema = new Schema<Exercise>({
  name: {
    type: String,
    required: true,
  },
  reps: {
    type: [Number],
    required: true,
  },
  weight: String,
  tempo: Number,
  notes: String,
});

export const TrainingSchema = new Schema<Training>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  exercises: {
    type: [ExerciseSchema],
    requried: true,
    validate: arrayIsEmpty,
  },
});

const Training = model<Training>('Training', TrainingSchema);

export default Training;
