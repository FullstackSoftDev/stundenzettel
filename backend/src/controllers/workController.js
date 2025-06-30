import Database from "better-sqlite3";
const db = new Database("app.db");
db.pragma("journal_mode = WAL")
// db.close()
// connection limit setzen

export function getWorkByUserID(req, res) {
    try {
        const { user_id } = req.params;
        const statement = db.prepare(`SELECT * FROM work WHERE user_id = ? ORDER BY created_at DESC`);
        const result = statement.all(user_id);
        res.status(200).json(result);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}

export function createWork(req, res) {
    try {
        const { user_id, first_name, last_name, category, description, date, duration } = req.body;

        if (!user_id || !first_name || !last_name || !category || !description || !date || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const entrie = db.prepare(`
            INSERT INTO work(user_id, first_name, last_name, category, description, date, duration)
            VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *
        `).run(user_id, first_name, last_name, category, description, date, duration);

        console.log(entrie);
        res.status(201).json(entrie[0]);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export function updateWork(req, res) {
    try {
        const { id } = req.params;
        const { user_id, first_name, last_name, category, description, date, duration } = req.body;

        if (!user_id || !first_name || !last_name || !category || !description || !date || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const entrie = db.prepare(`UPDATE work SET user_id = ?, first_name = ?, last_name = ?, category = ?, description = ?, date = ?, duration = ? WHERE id = ?`);
        const values = [user_id, first_name, last_name, category, description, date, duration, id];
        const result = entrie.run(values);

        console.log(result);
        res.status(201).json(result[0]);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export function deleteWorkByUserID(req, res) {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const statement = db.prepare(`DELETE FROM work WHERE id = ? RETURNING *`);
        const result = statement.all(id);

        if (result.length === 0) {
            return res.status(404).json({ message: "work not found" });
        }
        res.status(200).json({ message: "work deleted" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}
