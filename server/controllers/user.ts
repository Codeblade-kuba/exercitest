import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import UserModel from '../model/user';
import { validationResult } from 'express-validator';
import { User, UserBlueprint, UserPayload } from '../types/user';
import { AppException } from '../types/exceptions';
import handleAppErrors from '../utils/handleAppErrors';

export async function createUserController(req: Request, res: Response) {
  try {
    checkReqForErrors(req);
    const { name, email, password } = req.body;
    await checkIfUserExists(email);
    const user = createUser({ name, email, password });
    const token = createTokenForUser(user);
    res.status(201).send({ message: 'User created successfully', token });
  } catch (error) {
    handleAppErrors(res, error);
  }
}

function createUser(userBlueprint: UserBlueprint): User {
  const { name, email, password } = userBlueprint;

  const salt = generateHexSalt();
  const encryptedPassword = encryptPassword(password, salt);

  const user = new UserModel({ name, email, salt, password: encryptedPassword });
  user.save();

  return user;
}

async function checkIfUserExists(email: string) {
  const user = await UserModel.findOne<User>({ email });
  if (!!user) {
    throw { httpCode: 409 } as AppException;
  }
}

function generateHexSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function encryptPassword(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export async function loginUserController(req: Request, res: Response) {
  try {
    checkReqForErrors(req);
    const { email, password } = req.body;
    const user = await getUser(email, password);
    const token = createTokenForUser(user);
    return res
      .status(200)
      .send({ message: 'User authenticated successfully', token, expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    handleAppErrors(res, error);
  }
}

async function getUser(email: string, password: string) {
  const user = await UserModel.findOne<User>({ email });
  if (!user || !verifyUserPassword(user, password)) throw { httpCode: 401 } as AppException;

  return user;
}

function verifyUserPassword(user: User, password: string) {
  return encryptPassword(password, user.salt) === user.password;
}

function createTokenForUser(user: User) {
  const payload = getUserPayload(user);
  const token = signJwtToken(payload);
  if (!token) throw { httpCode: 499 } as AppException;
  return token;
}

function getUserPayload(user: User) {
  const payload: UserPayload = {
    user: {
      id: user._id,
      name: user.name,
    },
  };
  return payload;
}

function signJwtToken(payload: {}) {
  return jwt.sign(payload, getSecretKey());
}

function getSecretKey() {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw { httpCode: 503, message: 'JWT secret not provided!' } as AppException;
  }
  return secretKey;
}

function checkReqForErrors(req: Request) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw { httpCode: 400 } as AppException;
  }
  return false;
}
