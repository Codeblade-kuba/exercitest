import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/user';
import trainingRoutes from './routes/training';

const applyAppSettings = (expressInstance: express.Application) => {
  expressInstance.use(bodyParser.json({ limit: '30mb' }));
  expressInstance.use(cors());
};

const setAppRoutes = (expressInstance: express.Application) => {
  expressInstance.use('/user', userRoutes);
  expressInstance.use('/trainings', trainingRoutes);
};

const connectAppToDatabse = (expressInstance: express.Application) => {
  const CONNECTION_URL = process.env.DB_CONNECTION_URL;
  const PORT = process.env.PORT;

  if (!CONNECTION_URL || !PORT) {
    console.log('Missing dotenv variables: DB_CONNECTION_URL or PORT');
    return;
  }

  mongoose
    .connect(CONNECTION_URL)
    .then(() => expressInstance.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`Database connection error:\n ${error}`));
};

const initApp = () => {
  dotenv.config();
  const app = express();

  applyAppSettings(app);
  setAppRoutes(app);
  connectAppToDatabse(app);
};

initApp();
