const pool = require('../db.js');

async function listExports() {
    const [rows] = await pool.execute(
        'SELECT * FROM exports'
    );
    return rows;
}

async function getExportById(id) {
    const [rows] = await pool.execute(
        'SELECT * FROM exports WHERE id = ?',
        [id]
    );
    return rows[0] || null;
}

module.exports = {
    listExports,
    getExportById,
};