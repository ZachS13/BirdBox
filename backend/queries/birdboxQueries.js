const pool = require('../db.js');

async function getAllBoxes() {
    const [rows] = await pool.execute(
        'SELECT * FROM boxes'
    );
    return rows;
}

async function getBoxById(id) {
    const [rows] = await pool.execute(
        'SELECT * FROM boxes WHERE id = ?',
        [id]
    );
    return rows[0] || null;
}

async function createBox(data) {
    const sql = `
        INSERT INTO birdboxes (
            name,
            trail_name,
            latitude,
            longitude
        )
        VALUES (?, ?, ?, ?)
    `;

    const { name, trailName, latitude, longitude } = data;

    const [result] = await db.execute(sql, [
        name,
        trailName,
        latitude,
        longitude
    ]);

    // Return the newly created box
    return getBoxById(result.insertId);
}

async function updateBoxById(id, data) {
    const sql = `
        UPDATE birdboxes
        SET
            name = ?,
            trail_name = ?,
            latitude = ?,
            longitude = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    const { name, trailName, latitude, longitude } = data;

    const [result] = await db.execute(sql, [
        name,
        trailName,
        latitude,
        longitude,
        id
    ]);

    if (result.affectedRows === 0) {
        return null;
    }

    return getBoxById(id);
}
async function deleteBoxById(id) {
    const sql = `
        DELETE FROM birdboxes
        WHERE id = ?
    `;

    const [result] = await db.execute(sql, [id]);

    return result.affectedRows > 0;
}

async function getBoxSummary(boxId) {
    return { boxId: Number(boxId), status: 'stub', lastSeen: null };
}
async function getBoxTelemetry(boxId) {
    return { boxId: Number(boxId), telemetry: [] };
}
async function getBoxDetections(boxId) {
    return { boxId: Number(boxId), detections: [] };
}
async function getBoxImages(boxId) {
    return { boxId: Number(boxId), images: [] };
}

async function getBoxMaintenanceLogs(boxId) {
    return { boxId: Number(boxId), logs: [] };
}
async function createBoxMaintenanceLog(boxId, data) {
    return { id: 1, boxId: Number(boxId), ...data };
}
async function updateBoxMaintenanceLog(boxId, logId, data) {
    return { id: Number(logId), boxId: Number(boxId), ...data };
}
async function deleteBoxMaintenanceLog(boxId, logId) {
    return { deleted: true, boxId: Number(boxId), logId: Number(logId) };
}

async function getBoxMaintenanceSchedule(boxId) {
    return { boxId: Number(boxId), schedule: null };
}
async function createBoxMaintenanceSchedule(boxId, data) {
    return { id: 1, boxId: Number(boxId), ...data };
}
async function updateBoxMaintenanceSchedule(boxId, scheduleId, data) {
    return { id: Number(scheduleId), boxId: Number(boxId), ...data };
}
async function deleteBoxMaintenanceSchedule(boxId, scheduleId) {
    return { deleted: true, boxId: Number(boxId), scheduleId: Number(scheduleId) };
}

async function getBoxSettings(boxId) {
    return { boxId: Number(boxId), settings: {} };
}
async function updateBoxSettings(boxId, data) {
    return { boxId: Number(boxId), settings: data };
}

module.exports = {
    getAllBoxes,
    createBox,
    getBoxById,
    updateBoxById,
    deleteBoxById,
    getBoxSummary,
    getBoxTelemetry,
    getBoxDetections,
    getBoxImages,
    getBoxMaintenanceLogs,
    createBoxMaintenanceLog,
    updateBoxMaintenanceLog,
    deleteBoxMaintenanceLog,
    getBoxMaintenanceSchedule,
    createBoxMaintenanceSchedule,
    updateBoxMaintenanceSchedule,
    deleteBoxMaintenanceSchedule,
    getBoxSettings,
    updateBoxSettings
};