import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppException } from '../types/exceptions';
import handleAppErrors from '../utils/handleAppErrors';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getAuthTokenFromRequest(req, res);
    verifyToken(token);
    next();
  } catch (error) {
    handleAppErrors(res, error);
  }
};

function getAuthTokenFromRequest(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw { httpCode: 401 };

  const token = authHeader.split(' ')[1];
  if (!token) throw { httpCode: 401 };

  return token;
}

function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) throw { httpCode: 503, message: 'JWT Secret is empty!' } as AppException;

  jwt.verify(token, secret, (error) => {
    if (error) throw { httpCode: 401 } as AppException;
  });
}
