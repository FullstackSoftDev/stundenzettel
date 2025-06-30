import express from "express";
import { getVacationByUserID, createVacation, updateVacation, deleteVacationByUserID } from "../controllers/vacationController.js";

const vacationRouter = express.Router();

vacationRouter.get("/:user_id", getVacationByUserID);
vacationRouter.post("/", createVacation);
vacationRouter.put("/:id", updateVacation);
vacationRouter.delete("/:id", deleteVacationByUserID);

export default vacationRouter;