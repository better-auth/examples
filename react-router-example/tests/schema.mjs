import path from "node:path";
import Database from "better-sqlite3";

// Provisions the example's Better Auth SQLite database before the server
// boots. The example intentionally ships without migrations, so the tests
// create the schema they need and clear leftover rows on every start.
const dbPath = path.resolve(process.cwd(), "sqlite.db");
const db = new Database(dbPath);
db.exec(`
	CREATE TABLE IF NOT EXISTS account (id TEXT PRIMARY KEY, accountId TEXT NOT NULL, providerId TEXT NOT NULL, userId TEXT NOT NULL, accessToken TEXT, refreshToken TEXT, idToken TEXT, accessTokenExpiresAt INTEGER, refreshTokenExpiresAt INTEGER, scope TEXT, password TEXT, createdAt INTEGER NOT NULL, updatedAt INTEGER NOT NULL);
	CREATE TABLE IF NOT EXISTS session (id TEXT PRIMARY KEY, expiresAt INTEGER NOT NULL, token TEXT NOT NULL UNIQUE, createdAt INTEGER NOT NULL, updatedAt INTEGER NOT NULL, ipAddress TEXT, userAgent TEXT, userId TEXT NOT NULL);
	CREATE TABLE IF NOT EXISTS user (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, emailVerified INTEGER NOT NULL DEFAULT 0, image TEXT, createdAt INTEGER NOT NULL, updatedAt INTEGER NOT NULL, twoFactorEnabled INTEGER NOT NULL DEFAULT 0);
	CREATE TABLE IF NOT EXISTS verification (id TEXT PRIMARY KEY, identifier TEXT NOT NULL, value TEXT NOT NULL, expiresAt INTEGER NOT NULL, createdAt INTEGER, updatedAt INTEGER);
	DELETE FROM account;
	DELETE FROM session;
	DELETE FROM user;
	DELETE FROM verification;
`);
db.close();
