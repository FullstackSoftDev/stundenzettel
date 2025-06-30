import Database from "better-sqlite3";
const db = new Database("app.db");
db.pragma("journal_mode = WAL")

export function getVacationByUserID(req, res) {
    try {
        const { user_id } = req.params;
        const statement = db.prepare(`SELECT * FROM vacation WHERE user_id = ? ORDER BY created_at DESC`);
        const result = statement.all(user_id);
        res.status(200).json(result);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}

export function getVacationSummaryByUserID(req, res) {
    try {
        const { user_id } = req.params;
        const statement = db.prepare(`SELECT SUM(julianday(end_date) - julianday(start_date)) as Vocation_Total FROM vacation WHERE user_id = ?`);
        const result = statement.all(user_id);
        res.status(200).json(result);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}

export function createVacation(req, res) {
    try {
        const { user_id, first_name, last_name, type, note, start_date, end_date } = req.body;

        if (!user_id || !first_name || !last_name || !type || !note || !start_date || !end_date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const vacation = db.prepare(`
                INSERT INTO vacation(user_id, first_name, last_name, type, note, start_date, end_date)
                VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *
            `).run(user_id, first_name, last_name, type, note, start_date, end_date);

        console.log(vacation);
        res.status(201).json(vacation[0]);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export function updateVacation(req, res) {
    try {
        const { id } = req.params;
        const { user_id, first_name, last_name, type, note, start_date, end_date } = req.body;

        if (!user_id || !first_name || !last_name || !type || !note || !start_date || !end_date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const entrie = db.prepare(`UPDATE vacation SET user_id = ?, first_name = ?, last_name = ?, type = ?, note = ?, start_date = ?, end_date = ?`);
        const values = [user_id, first_name, last_name, type, note, start_date, end_date, id];
        const result = entrie.run(values);

        console.log(result);
        res.status(201).json(result[0]);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export function deleteVacationByUserID(req, res) {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const statement = db.prepare(`DELETE FROM vacation WHERE id = ? RETURNING *`);
        const result = statement.all(id);

        if (result.length === 0) {
            return res.status(404).json({ message: "vacation not found" });
        }
        res.status(200).json({ message: "vacation deleted" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}
