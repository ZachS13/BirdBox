const db = require("../db");

async function getImageById(id) {
    const sql = `
        SELECT *
        FROM birdbox_images
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
}

async function getImageDownloadById(id) {
    const sql = `
        SELECT
            id,
            file_url AS url
        FROM birdbox_images
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await db.execute(sql, [id]);

    if (rows.length === 0) return null;

    return rows[0];
}

async function deleteImageById(id) {
    const sql = `
        DELETE FROM birdbox_images
        WHERE id = ?
    `;

    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) return null;

    return { deleted: true, id: Number(id) };
}

module.exports = {
    getImageById,
    getImageDownloadById,
    deleteImageById
};