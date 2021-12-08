import { Router } from "express";

import moviesRoutes from "./moviesRoute.js";
import booksRoutes from "./booksRoute.js";

const router = Router();

router.use("/movies", moviesRoutes);
router.use("/books", booksRoutes);

export default router;
