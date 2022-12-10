import express from 'express';

import { loginUserController, createUserController } from '../controllers/user';
import { userLoginValidator, userCreateValidator } from '../middleware/validators';

const router = express.Router();

router.post('/login', userLoginValidator(), loginUserController);
router.post('/create', userCreateValidator(), createUserController);

export default router;
