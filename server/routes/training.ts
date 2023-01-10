import express from 'express';

import auth from '../middleware/auth';
import { createTrainingController, getTrainingController, getAllTrainingsController } from '../controllers/training';

const router = express.Router();

router.post('/create', auth, createTrainingController);

router.post('/get/:id', auth, getTrainingController);
router.post('/get/all', auth, getAllTrainingsController);

export default router;
