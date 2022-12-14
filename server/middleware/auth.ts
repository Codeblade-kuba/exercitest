import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  // TODO: Try/catch?
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send({ message: 'Authorization header not provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).send({ message: 'Token not provided' });
    return;
  }

  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    console.log('JWT Secret is empty!');
    res.status(503);
    return;
  }

  jwt.verify(token, secret, (error) => {
    if (error) {
      res.status(401).send({ message: 'Authorization failed' });
      return;
    }
    next();
  });
};
