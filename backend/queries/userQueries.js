// Add the SQL connection here

async function getAllUsers() {
    // TODO: SELECT * FROM users
    return [];
}

async function createUser(userData) {
    // TODO: INSERT INTO users (...) VALUES (...)
    return { id: 123, ...userData };
}

async function getUserById(id) {
    // TODO: SELECT * FROM users WHERE id = ?
    return { id: Number(id), username: 'stub-user' };
}

async function updateUserById(id, updates) {
    // TODO: UPDATE users SET ... WHERE id = ?
    return { id: Number(id), ...updates };
}

async function deleteUserById(id) {
    // TODO: DELETE FROM users WHERE id = ?
    return { deleted: true, id: Number(id) };
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
};