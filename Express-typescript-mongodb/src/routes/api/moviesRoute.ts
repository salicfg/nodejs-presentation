import { Router } from 'express';

import { create, findAll, findById, removeById, update } from '../../controllers/moviesController';
import requestValidator from '../../middlewares/requestValidator';
import { movieCreateValidator, movieUpdateValidator } from '../../models/movieValidator';

export const router: Router = Router();

router.get('/', findAll);

router.get('/:id', findById);

// It is a common practice to implement a validation top of mongoose, even if you have a mongoose schema.
// This will return validation error 400 BAD_REQUEST before data execution.
router.post('/', [requestValidator(movieCreateValidator)], create);

router.put('/', [requestValidator(movieUpdateValidator)], update);

router.delete('/:id', removeById);

export default router;
