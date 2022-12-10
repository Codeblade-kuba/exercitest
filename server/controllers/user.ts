import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import UserModel from '../model/user';
import { validationResult } from 'express-validator';
import { User, UserBlueprint, UserPayload } from '../types/user';

export async function loginUserController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.sendStatus(400);

  const { email, password } = req.body;

  const user = await UserModel.findOne<User>({ email });

  if (!user || !verifyUserPassword(user, password)) return res.sendStatus(401);

  const token = createUserJwtToken(user);

  if (!token) return res.sendStatus(401);

  res.status(200).send({ message: 'User authenticated successfully', token, expiresIn: 12000000 });
}

function verifyUserPassword(user: User, password: string) {
  return encryptPassword(password, user.salt) !== user.password;
}

function createUserJwtToken(user: User) {
  const payload = getUserPayload(user);
  const token = signJwtToken(payload);
  return token;
}

function signJwtToken(payload: {}) {
  return jwt.sign(payload, getSecretKey());
}

function getSecretKey() {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    console.log('JWT secret key missing!');
    return '';
  }

  return secretKey;
}

function getUserPayload(user: User) {
  const payload: UserPayload = {
    user: {
      id: user._id,
    },
  };
  return payload;
}

export async function createUserController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.sendStatus(400);

  const { name, email, password } = req.body;

  const userBlueprint = {
    name,
    email,
    password,
  };
  const user = createUser(userBlueprint);

  const token = createUserJwtToken(user);

  if (!token) return res.sendStatus(401);

  res.status(201).send({ message: 'User created successfully', token });
}

function createUser(userBlueprint: UserBlueprint): User {
  const { name, email, password } = userBlueprint;

  const salt = generateHexSalt();
  const encryptedPassword = encryptPassword(password, salt);

  const user = new UserModel({ name, email, salt, password: encryptedPassword });
  user.save();

  return user;
}

function generateHexSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function encryptPassword(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}
