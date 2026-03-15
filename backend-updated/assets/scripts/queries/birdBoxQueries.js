const db = require("../../sql/database.js");

async function getAllBoxes() {
    const [rows] = await db.query(
        `
        SELECT 
            id, 
            name, 
            trail_name AS trail, 
            latitude AS lat, 
            longitude AS lng, 
            notes 
        FROM 
            birdboxes;
        `,
    );

    return rows.length ? rows : null;
}

async function getBoxById(id) {
    const [rows] = await db.execute(
        `
        SELECT 
            id, 
            name, 
            trail_name AS trail, 
            latitude AS lat, 
            longitude AS lng, 
            notes 
        FROM 
            birdboxes 
        WHERE 
            id = ?;
        `,
        [id],
    );

    return rows[0] || null;
}

async function createNewBox(data) {
    const { name, trail, lat, lng } = data;

    const params = [name, trail, lat, lng];

    const [result] = await db.execute(
        `
        INSERT INTO birdboxes (
            name, 
            trail_name, 
            latitude, 
            longitude
        ) 
        VALUES (?, ?, ?, ?);
        `,
        params,
    );

    return getBoxById(result.insertId);
}

async function updateBoxById(id, data) {
    const { name, trail, lat, lng, notes } = data;

    const params = [name, trail, lat, lng, , notes, id];

    await db.execute(
        `
        UPDATE 
            birdboxes 
        SET 
            name = ?, 
            trail_name = ?, 
            latitude = ?, 
            longitude = ?, 
            notes = ?, 
            updated_at = NOW() 
        WHERE 
            id = ?;
        `,
        params,
    );

    return getBoxById(id);
}

async function deleteBoxById(id) {
    const [result] = await db.execute(
        `
        DELETE FROM 
            birdboxes 
        WHERE 
            id = ?;
        `,
        [id],
    );

    return result.affectedRows > 0;
}

async function getBoxSummary(boxId) {
    return { boxId: Number(boxId), status: "stub", lastSeen: null };
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

module.exports = {
    getAllBoxes,
    getBoxById,
    createNewBox,
    updateBoxById,
    deleteBoxById,
    getBoxSummary,
    getBoxTelemetry,
    getBoxDetections,
    getBoxImages,
};
