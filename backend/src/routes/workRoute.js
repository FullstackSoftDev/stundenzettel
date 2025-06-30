import express from "express";
import { getWorkByUserID, createWork, updateWork, deleteWorkByUserID } from "../controllers/workController.js";

const workRouter = express.Router();

workRouter.get("/:user_id", getWorkByUserID);
workRouter.post("/", createWork);
workRouter.put("/:id", updateWork);
workRouter.delete("/:id", deleteWorkByUserID);

export default workRouter;