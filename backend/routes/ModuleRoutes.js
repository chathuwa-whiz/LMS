import { createModule, getAllModules, getModuleById, updateModule, deleteModule } from "../controllers/ModuleController.js";
import express from 'express';

const moduleRoutes = express.Router();

moduleRoutes.post("/", createModule);
moduleRoutes.get("/", getAllModules);
moduleRoutes.get("/:id", getModuleById);
moduleRoutes.put("/:id", updateModule);
moduleRoutes.delete("/:id", deleteModule);

export default moduleRoutes;