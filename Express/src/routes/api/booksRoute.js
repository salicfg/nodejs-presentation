import { Router } from 'express';
import { findAll } from '../../controllers/booksController.js';

const router = Router();

router.get('/', findAll);

export default router;
