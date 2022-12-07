import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(cors())

app.use('/user', userRoutes);

const CONNECTION_URL = process.env.DB_CONNECTION_URL || '';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.error(`Database connection error:\n ${error}`));
