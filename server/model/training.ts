import { model, Schema } from 'mongoose';

import { Training, Exercise } from '../types/training';

const ExerciseSchema = new Schema<Exercise>({
  name: String,
  reps: [Number],
  weight: String,
  tempo: Number,
  notes: String,
});

const TrainingSchema = new Schema<Training>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  exercises: [ExerciseSchema],
});

const Training = model<Training>('Training', TrainingSchema);

export default Training;
