import { Response } from 'express';
import { ObjectSchema } from 'joi';

export function internalServerError(res: Response) {
  res.status(500).send({ message: 'Internal Server Error!' });
}

export function notFound(res: Response) {
  res.status(404).send({ message: 'Not Found' });
}

export function badRequest(res: Response, message: any) {
  res.status(400).send({ message });
}

export function commonControllerHandler(res: Response, callback: () => void) {
  try {
    callback();
  } catch (e) {
    internalServerError(res);
  }
}

export function isRequestObjectValid(res: Response, schema: ObjectSchema, object: { [key: string]: any }): boolean {
  const error = commonSchemeErrorParser(schema, object);
  if (error) {
    badRequest(res, error);
    return false;
  }
  return true;
}

export function commonSchemeErrorParser(schema: ObjectSchema, object: { [key: string]: any }): string | null {
  const { error } = schema.validate(object, { abortEarly: false });
  if (error) {
    return error.details.map((det: any) => det.message).join(', ');
  }
  return null;
}
