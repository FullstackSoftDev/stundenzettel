import express from "express";
import dotenv from "dotenv";
import workRoute from "./routes/workRoute.js";
import vacationRoute from "./routes/vacationRoute.js";
import sickRoute from "./routes/sickRoute.js";
import Database from "better-sqlite3";

const db = new Database("app.db");
db.pragma("journal_mode = WAL")
const PORT = process.env.PORT || 5002;

db.exec(
    `CREATE TABLE IF NOT EXISTS work(
        id INTEGER PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        first_Name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        duration DECIMAL(10,2) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
    );

    CREATE TABLE IF NOT EXISTS vacation(
        id INTEGER PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        first_Name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        note VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
    );

    CREATE TABLE IF NOT EXISTS sick(
        id INTEGER PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        first_Name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        certificate BOOLEAN NOT NULL,
        note VARCHAR(255) NOT NULL DEFAULT 'Keine Notiz hinterlassen',
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
    );`
);

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/work", workRoute);
app.use("/api/vacation", vacationRoute);
app.use("/api/sick", sickRoute);

app.get("/api/summary/:user_id", (req, res) => {
    try {
        const { user_id } = req.params;

        const work = db.prepare(`SELECT COALESCE(SUM(duration), 0) as Work_Total FROM work WHERE user_id = ?`).all(user_id);
        const vacation = db.prepare(`SELECT SUM(end_date - start_date) as Vocation_Total FROM vacation WHERE user_id = ?`).all(user_id);
        const sick = db.prepare(`SELECT SUM(end_date - start_date) as Sick_Total FROM sick WHERE user_id = ?`).all(user_id);

        const summary = {
            "work": work,
            "vacation": vacation,
            "sick": sick
        }

        res.status(200).json(summary);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/test", (req, res) => {
    res.send("Server is working!");
});

app.listen(PORT, () => {
    console.log("Server ist running on port: " + PORT);
});
