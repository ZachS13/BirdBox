const db = require("../../sql/database.js");

async function getSessionByToken(token) {
    const [rows] = await db.execute(
        `
        SELECT 
            * 
        FROM 
            sessions 
        WHERE 
            token = ?;
        `,
        [token],
    );

    return rows[0] || null;
}

async function createSession(userId, token) {
    const [result] = await db.execute(
        `
        INSERT INTO sessions (
            user_id, 
            token, 
            expires_at
        ) 
        VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 DAY));`,
        [userId, token],
    );

    return { id: result.insertId };
}

async function deleteSessionByToken(token) {
    await db.execute(
        `
        DELETE FROM 
            sessions 
        WHERE 
            token = ?;
        `,
        [token],
    );

    return { success: true };
}

async function deleteSessionsByUserId(userId) {
    await db.execute(
        `
        DELETE FROM 
            sessions 
        WHERE 
            user_id = ?;
        `,
        [userId],
    );

    return { success: true };
}

module.exports = {
    getSessionByToken,
    createSession,
    deleteSessionByToken,
    deleteSessionsByUserId,
};
