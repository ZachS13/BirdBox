const pool = require('../db');

async function getSessionByToken(token) {
    const [rows] = await pool.query(
        'SELECT * FROM sessions WHERE token = ? LIMIT 1',
        [token]
    );

    return rows[0] || null;
}

async function createSession({ user_id, token }) {
    const [result] = await pool.query(
        `INSERT INTO sessions (user_id, token, created_at, expires_at)
         VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY))`,
        [user_id, token]
    );

    return { id: result.insertId };
}

async function deleteSessionByToken(token) {
    await pool.query(
        'DELETE FROM sessions WHERE token = ?',
        [token]
    );

    return { deleted: true };
}

async function deleteSessionsByUserId(userId) {
    await pool.query(
        'DELETE FROM sessions WHERE user_id = ?',
        [userId]
    );

    return { deleted: true };
}

module.exports = {
    getSessionByToken,
    createSession,
    deleteSessionByToken,
    deleteSessionsByUserId
};
