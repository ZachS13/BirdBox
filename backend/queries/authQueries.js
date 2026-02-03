// Stubbed helpers for login-related DB operations.

async function findUserByUsername(username) {
    // TODO: SELECT * FROM users WHERE username = ?
    // Return null if not found
    return username
        ? { id: 1, username, password_hash: 'stub-hash' }
        : null;
}

module.exports = {
    findUserByUsername
};