const pool = require('../db.js');

async function getMaintenanceLogById(id) {
    const sql = `
        SELECT *
        FROM maintenance_logs
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
}

async function getMaintenanceScheduleById(id) {
    const sql = `
        SELECT *
        FROM maintenance_schedules
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
}

module.exports = {
    getMaintenanceLogById,
    getMaintenanceScheduleById
};