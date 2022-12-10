import { body } from 'express-validator';

export const userLoginValidator = () => {
  return [
    body('email').escape().trim().exists().isEmail().normalizeEmail(),
    body('password').escape().trim().isLength({ min: 8, max: 30 }),
  ];
};

export const userCreateValidator = () => {
  return [
    body('name').escape().exists().isLength({ min: 5, max: 24 }),
    body('email').escape().trim().exists().isEmail().normalizeEmail(),
    body('password').escape().trim().exists().isLength({ min: 8, max: 30 }),
  ];
};
