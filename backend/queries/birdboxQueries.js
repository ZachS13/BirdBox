const pool = require('../db.js');

async function getAllBoxes() {
    const [rows] = await pool.execute(
        'SELECT id, name, trail_name AS trail, latitude AS lat, longitude AS lng, notes FROM birdboxes'
    );
    return rows;
}

async function getBoxById(id) {
    const [rows] = await pool.execute(
        'SELECT id, name, trail_name AS trail, latitude AS lat, longitude AS lng, notes FROM birdboxes WHERE id = ?',
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

    const [result] = await pool.execute(sql, [
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

    const [result] = await pool.execute(sql, [
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

    const [result] = await pool.execute(sql, [id]);

    return result.affectedRows > 0;
}

async function getBoxSummary(boxId) {
    const sql = `
        SELECT *
        FROM birdboxes
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [boxId]);
    return rows[0] || null;
}

async function getBoxTelemetry(boxId) {
    const sql = `
        SELECT *
        FROM birdbox_telemetry
        WHERE birdbox_id = ?
        ORDER BY recorded_at DESC
    `;

    const [rows] = await pool.execute(sql, [boxId]);
    return rows;
}

async function getBoxDetections(boxId) {
    const sql = `
        SELECT *
        FROM birdbox_overview_history
        WHERE birdbox_id = ?
        ORDER BY range_end DESC
    `;

    const [rows] = await pool.execute(sql, [boxId]);
    return rows;
}

async function getBoxImages(boxId) {
    const sql = `
        SELECT *
        FROM birdbox_images
        WHERE birdbox_id = ?
        ORDER BY captured_at DESC
    `;

    const [rows] = await pool.execute(sql, [boxId]);
    return rows;
}

async function getBoxMaintenanceLogs(boxId) {
    const sql = `
        SELECT *
        FROM maintenance_logs
        WHERE birdbox_id = ?
        ORDER BY created_at DESC
    `;

    const [rows] = await pool.execute(sql, [boxId]);
    return rows;
}

async function createBoxMaintenanceLog(boxId, data) {
    const { user_id, title, description } = data;

    const sql = `
        INSERT INTO maintenance_logs (
            user_id,
            birdbox_id,
            title,
            description
        )
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        user_id,
        boxId,
        title,
        description
    ]);

    return result.insertId;
}

async function updateBoxMaintenanceLog(boxId, logId, data) {
    const { title, description } = data;

    const sql = `
        UPDATE maintenance_logs
        SET
            title = ?,
            description = ?
        WHERE id = ?
        AND birdbox_id = ?
    `;

    const [result] = await pool.execute(sql, [
        title,
        description,
        logId,
        boxId
    ]);

    return result.affectedRows > 0;
}

async function deleteBoxMaintenanceLog(boxId, logId) {
    const sql = `
        DELETE FROM maintenance_logs
        WHERE id = ?
        AND birdbox_id = ?
    `;

    const [result] = await pool.execute(sql, [logId, boxId]);
    return result.affectedRows > 0;
}

async function getBoxMaintenanceSchedule(boxId) {
    const sql = `
        SELECT s.*
        FROM maintenance_schedules s
        JOIN maintenance_logs l
            ON l.id = s.maintenance_log_id
        WHERE l.birdbox_id = ?
        ORDER BY s.created_at DESC
    `;

    const [rows] = await pool.execute(sql, [boxId]);
    return rows;
}

async function createBoxMaintenanceSchedule(boxId, data) {
    const {
        maintenance_log_id,
        title,
        description,
        type,
        priority,
        is_recurring,
        status
    } = data;

    const sql = `
        INSERT INTO maintenance_schedules (
            maintenance_log_id,
            title,
            description,
            type,
            priority,
            is_recurring,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        maintenance_log_id,
        title,
        description,
        type,
        priority,
        is_recurring,
        status
    ]);

    return result.insertId;
}

async function updateBoxMaintenanceSchedule(boxId, scheduleId, data) {
    const {
        title,
        description,
        type,
        priority,
        is_recurring,
        status
    } = data;

    const sql = `
        UPDATE maintenance_schedules s
        JOIN maintenance_logs l
            ON l.id = s.maintenance_log_id
        SET
            s.title = ?,
            s.description = ?,
            s.type = ?,
            s.priority = ?,
            s.is_recurring = ?,
            s.status = ?
        WHERE s.id = ?
        AND l.birdbox_id = ?
    `;

    const [result] = await pool.execute(sql, [
        title,
        description,
        type,
        priority,
        is_recurring,
        status,
        scheduleId,
        boxId
    ]);

    return result.affectedRows > 0;
}

async function deleteBoxMaintenanceSchedule(boxId, scheduleId) {
    const sql = `
        DELETE s
        FROM maintenance_schedules s
        JOIN maintenance_logs l
            ON l.id = s.maintenance_log_id
        WHERE s.id = ?
        AND l.birdbox_id = ?
    `;

    const [result] = await pool.execute(sql, [
        scheduleId,
        boxId
    ]);

    return result.affectedRows > 0;
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