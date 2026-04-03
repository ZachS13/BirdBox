const db = require("../../sql/database.js");

async function getAllBoxes() {
    const [boxes] = await db.query(
        `
        SELECT 
            birdboxes.id, 
            birdboxes.name, 
            birdboxes.trail_name AS trail, 
            birdboxes.latitude AS lat, 
            birdboxes.longitude AS lng, 
            birdboxes.notes,
            birdbox_telemetry.battery_life AS battery
        FROM 
            birdboxes
        JOIN
            birdbox_telemetry
        ON
            birdboxes.id = birdbox_telemetry.birdbox_id;
        `,
    );

    // TODO: Format response for multiple images.
    for (const box of boxes) {
        const [images] = await db.execute(
            `
            SELECT
                birdbox_images.id,
                birdbox_images.file_url AS fileUrl,
                birdbox_images.file_type AS fileType,
                birdbox_images.file_size AS fileSize,
                birdbox_images.captured_at AS capturedAt,
                species.name AS speciesName,
                species_detections.confidence_pct AS confidencePct
            FROM
                birdbox_images
            JOIN
                species_detections
            ON
                birdbox_images.id = species_detections.image_id
            JOIN
                species
            ON
                species_detections.species_id = species.id
            WHERE
                birdbox_images.birdbox_id = ?
            ORDER BY
                birdbox_images.captured_at DESC,
                birdbox_images.id DESC;
            `,
            [box.id],
        );

        box.images = images;

        const [detections] = await db.execute(
            `
            SELECT
                COUNT(species_detections.id) AS totalSightings
            FROM
                species_detections
            WHERE
                birdbox_id = ?;
            `,
            [box.id],
        );

        const [{ totalSightings }] = detections;

        box.totalSightings = totalSightings;
    }

    return boxes.length ? boxes : null;
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
