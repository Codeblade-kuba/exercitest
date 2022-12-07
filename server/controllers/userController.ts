import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import User from '../model/user';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: 'Expected to receive email and password' });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).send({ message: 'Invalid credentials' });
    return;
  }

  if (encryptPassword(password, user.salt) !== user.password) {
    res.status(401).send({ message: 'Invalid credentials' });
    return;
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = signJwtToken(payload);

  res.status(200).send({ message: 'User authenticated successfully', token, expiresIn: 12000000 });
};

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
