import express from "express";
import { getSickByUserID, getSickSummaryByUserID, createSick, updateSick, deleteSickByUserID } from "../controllers/sickController.js";

const sickRouter = express.Router();

sickRouter.get("/:user_id", getSickByUserID);
sickRouter.get("/summary/:user_id", getSickSummaryByUserID);
sickRouter.post("/", createSick);
sickRouter.put("/:id", updateSick);
sickRouter.delete("/:id", deleteSickByUserID);

export default sickRouter;