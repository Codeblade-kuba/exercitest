import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import User from '../model/user';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // TODO: Improve req params validation
  if (!name || !email || !password) {
    res.status(400).send({ message: 'Expected to receive name, email and password' });
    return;
  }

  const salt = generateHexSalt();
  const encryptedPassword = encryptPassword(password, salt);

  const user = new User({ name, email, salt, password: encryptedPassword });
  await user.save();

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = signJwtToken(payload);

  if (!token) {
    res.status(400).send({ message: 'Token sign went wrong' });
    return;
  }
  res.status(201).send({ message: 'User created successfully', token });
  return;
};

const generateHexSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};

const encryptPassword = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

const signJwtToken = (payload: {}) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    console.log('JWT secret key missing');
    return '';
  }

  return jwt.sign(payload, secretKey);
};
