import Database from 'better-sqlite3';
import * as path from 'path';

const dbPath = path.resolve(process.cwd(), 'data', 'gacha.sqlite');
const db = new Database(dbPath);
db.prepare(`
    CREATE TABLE IF NOT EXISTS gacha_state (
        user_id TEXT PRIMARY KEY,
        pity5   INTEGER NOT NULL
    )
`).run();

export default db;
