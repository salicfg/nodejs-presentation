import { ObjectSchema } from 'joi';

import { Request, Response, NextFunction } from 'express';
import { isRequestObjectValid } from '../utils';

export default function (schema: ObjectSchema) {
  return function(req: Request, res: Response, next: NextFunction) {
    isRequestObjectValid(res, schema, req.body) && next();
  }
}