import { Request, Response } from 'express';

import TrainingModel from '../model/training';

export async function createTrainingController(req: Request, res: Response) {
  const { name, description } = req.body;

  const training = new TrainingModel({ name, description });
  await training.save();

  res.status(201).send({ training });
  // res.status(201).send({ message: 'Training created successfully' });
}