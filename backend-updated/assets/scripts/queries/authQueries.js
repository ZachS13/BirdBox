const db = require("../../sql/database.js");

async function findUserBy(column, value) {
    const [rows] = await db.execute(
        `
        SELECT 
            * 
        FROM 
            users 
        WHERE 
            ${column} = ?;
        `,
        [value],
    );

    return rows[0] || null;
}

async function updateLastLoginAt(userId) {
    const [result] = await db.execute(
        `
        UPDATE 
            users 
        SET 
            last_login_at = NOW() 
        WHERE 
            id = ?;
        `,
        [userId],
    );

    return result.affectedRows > 0;
}

module.exports = {
    findUserBy,
    updateLastLoginAt,
};
