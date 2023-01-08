import express from 'express';

import { createTrainingController } from '../controllers/training';

const router = express.Router();

router.post('/create', createTrainingController);

export default router;
