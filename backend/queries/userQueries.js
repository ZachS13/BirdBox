const pool = require('../db');

async function getAllUsers() {
    const [rows] = await pool.execute(
        'SELECT * FROM users'
    );
    return rows;
}

async function getUserById(id) {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE id = ? LIMIT 1',
        [id]
    );

    return rows[0] || null;
}

async function findByEmail(email) {
    console.log("Finding user by email:", email);

    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email]
    );

    return rows[0] || null;
}

async function createUser(user) {
    console.log("Creating user with data:", user);

    const { username, email, password } = user;

    const [result] = await pool.execute(
        `INSERT INTO users (username, email, password, created_at)
         VALUES ( ?, ?, ?, NOW())`,
        [username, email, password]
    );

    return { id: result.insertId };
}

async function updateUserById(id, user) {
    const { username, email, phone } = user || {};

    const [result] = await pool.execute(
        `UPDATE users
         SET username = ?, email = ?, phone = ?, updated_at = NOW()
         WHERE id = ?`,
        [username, email, phone, id]
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
    findByEmail,
    createUser,
    updateUserById,
    deleteUserById
};