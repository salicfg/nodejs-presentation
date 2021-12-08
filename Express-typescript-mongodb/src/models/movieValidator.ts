import Joi, { ObjectSchema } from 'joi';

export const movieCreateValidator: ObjectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  releaseDate: Joi.string().length(4).required(),
  director: Joi.string().required(),
  stars: Joi.array().items(Joi.string().required()), // Array contains at least one string
});

export const movieUpdateValidator: ObjectSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(), // id have to match the uuid v4 format and it is required
  title: Joi.string().min(3).required(),
  releaseDate: Joi.string().length(4).required(),
  director: Joi.string().required(),
  stars: Joi.array().items(Joi.string().required()).required(), // Array contains at least one string
});
