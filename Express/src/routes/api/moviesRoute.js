import { Router } from "express";
import {
  findAll,
  findById,
  create,
  update,
  removeById,
} from "../../controllers/moviesController.js";

const router = Router();

router.get("/", findAll);

router.get("/:id", findById);

router.post("/", create); //it may cause false warning: jetbrains issue: WEB-46292

router.put("/", update); //it may cause false warning: jetbrains issue: WEB-46292

router.delete("/:id", removeById); //it may cause false warning: jetbrains issue: WEB-46292

export default router;
