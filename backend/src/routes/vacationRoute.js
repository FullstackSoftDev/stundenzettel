import express from "express";
import { getVacationByUserID, getVacationSummaryByUserID, createVacation, updateVacation, deleteVacationByUserID } from "../controllers/vacationController.js";

const vacationRouter = express.Router();

vacationRouter.get("/:user_id", getVacationByUserID);
vacationRouter.get("/summary/:user_id", getVacationSummaryByUserID);
vacationRouter.post("/", createVacation);
vacationRouter.put("/:id", updateVacation);
vacationRouter.delete("/:id", deleteVacationByUserID);

export default vacationRouter;