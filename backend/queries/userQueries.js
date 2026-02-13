const pool = require('../db');

async function getAllUsers() {
    const [rows] = await pool.query(
        'SELECT * FROM users'
    );
    return rows;
}

async function getUserById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    );

    return rows[0] || null;
}

async function createUser(user) {
    const { first_name, last_name, username, email, password, phone } = user;

    const [result] = await pool.query(
        `INSERT INTO users (first_name, last_name, username, email, password, phone, created_at)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [first_name, last_name, username, email, password, phone]
    );

    return { id: result.insertId };
}

async function updateUserById(id, user) {
    const { first_name, last_name, username, email, phone } = user;

    await pool.query(
        `UPDATE users
        SET first_name = ?, last_name = ?, username = ?, email = ?, phone = ?, updated_at = NOW()
        WHERE id = ?`,
        [first_name, last_name, username, email, phone, id]
    );

    return { updated: true };
}

async function deleteUserById(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return { deleted: true };
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};