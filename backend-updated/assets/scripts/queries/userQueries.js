const db = require("../../sql/database.js");

async function getAllUsers() {
    const [rows] = await db.query(
        `
        SELECT 
            id, 
            username, 
            email 
        FROM 
            users;
        `,
    );

    return rows;
}

async function getUserBy(column, value) {
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

async function createNewUser(email, username, password) {
    const params = [email, username, password];

    const [result] = await db.execute(
        `
        INSERT INTO users (
            email, 
            username, 
            password, 
            last_login_at
        ) 
        VALUES (?, ?, ?, NOW());
        `,
        params,
    );

    return { id: result.insertId, email, username };
}

async function updateUserById(id, user) {
    const { username, email, hashed } = user;

    const params = [email, username, hashed, id];

    const [result] = await db.execute(
        `
        UPDATE 
            users 
        SET 
            email = ?, 
            username = ?, 
            password = ?, 
            updated_at = NOW() 
        WHERE 
            id = ?;
        `,
        params,
    );

    if (result.affectedRows === 0) return { success: false, reason: "user_not_found" };

    if (result.changedRows === 0) return { success: false, reason: "no_changes" };

    return { success: true };
}

async function deleteUserById(id) {
    const [result] = await db.execute(
        `
        DELETE FROM 
            users 
        WHERE 
            id = ?;
        `,
        [id],
    );

    if (result.affectedRows === 0) return { success: false, reason: "user_not_found" };

    return { success: true };
}

module.exports = {
    getAllUsers,
    getUserBy,
    createNewUser,
    updateUserById,
    deleteUserById,
};
