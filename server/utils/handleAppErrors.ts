import { Response } from 'express';
import { AppException } from '../types/exceptions';

export default function handleAppErrors(res: Response, error: unknown) {
  const appError = error as AppException;
  if (appError.message) console.error(appError.message);
  res.sendStatus(appError.httpCode);
}
