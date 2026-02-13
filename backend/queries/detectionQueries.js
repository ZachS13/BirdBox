const pool = require('../db');

async function getDetectionById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM detections WHERE id = ?',
        [id]
    );

    return rows[0] || null;
}

module.exports = {
    getDetectionById
};
