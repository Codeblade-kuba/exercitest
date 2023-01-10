import { Request, Response } from 'express';
import Training from '../model/training';

import TrainingModel from '../model/training';
import User from '../model/user';
import handleAppErrors from '../utils/handleAppErrors';
import { AppException } from '../types/exceptions';
import { Types } from 'mongoose';

export async function createTrainingController(req: Request, res: Response) {
  try {
    const { name, description, exercises, id } = req.body;

    const user = User.findById(id);

    if (!user) {
      throw { httpCode: 401 } as AppException;
    }

    const training = new TrainingModel({ name, description, exercises });
    await training.save();

    await user.update({ $push: { trainings: training._id } });

    res.status(201).send({ id: training._id, message: 'Training created successfully' });
  } catch (error) {
    handleAppErrors(res, error);
  }
}

export async function getTrainingController(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const requestedTrainingId = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      throw { httpCode: 401 } as AppException;
    }

    const matchingUserTraining = user.trainings.find((training) => String(training) === requestedTrainingId);

    if (!matchingUserTraining) {
      throw { httpCode: 404 } as AppException;
    }

    const training = await Training.findById(requestedTrainingId);

    if (!training) {
      throw { httpCode: 401 } as AppException;
    }

    res.status(200).send({ training });
  } catch (error) {
    handleAppErrors(res, error);
  }
}

export async function getAllTrainingsController(req: Request, res: Response) {
  const { id } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return;
  }

  const trainings = await Training.find({ _id: { $in: user.trainings } });

  res.status(200).send({ trainings });
}
