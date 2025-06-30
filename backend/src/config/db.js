import Database from "better-sqlite3";
const db = new Database("app.db");
db.pragma("journal_mode = WAL");

export function initDB() {

    db.exec(`
        CREATE TABLE IF NOT EXISTS work(
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
        );
    `);
}