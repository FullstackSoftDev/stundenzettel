import express from "express";
import { getWorkByUserID, getWorkSummaryByUserID, createWork, updateWork, deleteWorkByUserID } from "../controllers/workController.js";

const workRouter = express.Router();

workRouter.get("/:user_id", getWorkByUserID);
workRouter.get("/summary/:user_id", getWorkSummaryByUserID);
workRouter.post("/", createWork);
workRouter.put("/:id", updateWork);
workRouter.delete("/:id", deleteWorkByUserID);

export default workRouter;