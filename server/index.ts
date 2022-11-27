import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use('/', (req, res) => {
  res.send('hello world');
});

const CONNECTION_URL = process.env.DB_CONNECTION_URL || '';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => `Database connection error:\n ${error}`);
