import express from "express";
import dotenv from "dotenv";
import workRoute from "./routes/workRoute.js";
import vacationRoute from "./routes/vacationRoute.js";
import sickRoute from "./routes/sickRoute.js";
import { initDB } from "./config/db.js";

const PORT = process.env.PORT || 5002;

dotenv.config();
const app = express();
app.use(express.json());

//initDB();

app.use("/api/work", workRoute);
app.use("/api/vacation", vacationRoute);
app.use("/api/sick", sickRoute);

app.get("/api/test", (req, res) => {
    res.send("Server is working!");
});

app.listen(PORT, () => {
    console.log("Server ist running on port: " + PORT);
});
