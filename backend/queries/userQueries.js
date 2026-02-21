const pool = require('../db');

async function getAllUsers() {
    const [rows] = await pool.execute(
        'SELECT * FROM users'
    );
    return rows;
}

async function getUserById(id) {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
    );

    return rows[0] || null;
}

async function createUser(user) {
    const { first_name, last_name, username, email, password, phone } = user || {};

    const [result] = await pool.execute(
        `INSERT INTO users (first_name, last_name, username, email, password, phone, created_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [first_name, last_name, username, email, password, phone]
    );

    return { id: result.insertId };
}

async function updateUserById(id, user) {
    const { first_name, last_name, username, email, phone } = user || {};

    const [result] = await pool.execute(
        `UPDATE users
         SET first_name = ?, last_name = ?, username = ?, email = ?, phone = ?, updated_at = NOW()
         WHERE id = ?`,
        [first_name, last_name, username, email, phone, id]
    );

    if (result.affectedRows === 0) {
        return { updated: false, reason: "user_not_found" };
    }

    if (result.changedRows === 0) {
        return { updated: false, reason: "no_changes" };
    }

    return { updated: true };
}

async function deleteUserById(id) {
    const [result] = await pool.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        return { deleted: false, reason: "user_not_found" };
    }

    return { deleted: true };
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};