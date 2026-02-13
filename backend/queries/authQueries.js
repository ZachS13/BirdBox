// queries/userQueries.js
// Assumes you have a DB helper that returns a mysql2/promise pool/connection.
// Example DB helper patterns:
//   const pool = require("../db"); // pool.execute(sql, params)
// Adjust the import below to match your project.
const db = require("../db");

async function findUserByEmail(email) {
    const sql = `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
  `;
    const [rows] = await db.execute(sql, [email]);
    return rows[0] || null;
}

async function findUserPublicById(userId) {
    const sql = `
    SELECT *
    FROM users
    WHERE id = ?
    LIMIT 1
  `;
    const [rows] = await db.execute(sql, [userId]);
    return rows[0] || null;
}

async function createUser({ name, email, passwordHash, role = "viewer" }) {
    const sql = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
  `;
    const [result] = await db.execute(sql, [name, email, passwordHash, role]);

    // Return the new user (public fields)
    return await findUserPublicById(result.insertId);
}

async function updateLastLoginAt(userId) {
    const sql = `
    UPDATE users
    SET last_login_at = CURRENT_TIMESTAMP(6)
    WHERE id = ?
  `;
    await db.execute(sql, [userId]);
    return true;
}

async function emailExists(email) {
    const sql = `
    SELECT 1
    FROM users
    WHERE email = ?
    LIMIT 1
  `;
    const [rows] = await db.execute(sql, [email]);
    return rows.length > 0;
}

module.exports = {
    findUserByEmail,
    findUserPublicById,
    createUser,
    updateLastLoginAt,
    emailExists
};
