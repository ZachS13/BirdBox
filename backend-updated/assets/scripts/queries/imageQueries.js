const db = require("../../sql/database.js");

async function getImageById(id) {
    const [rows] = await db.execute(
        `
        SELECT 
            *
        FROM 
            birdbox_images
        WHERE 
            id = ?;
        `,
        [id],
    );

    return rows[0] || null;
}

async function getImageDownloadById(id) {
    const [rows] = await db.execute(
        `
        SELECT
            id,
            file_url AS fileUrl
        FROM 
            birdbox_images
        WHERE 
            id = ?;
        `,
        [id],
    );

    return rows[0] || null;
}

async function deleteImageById(id) {
    const [result] = await db.execute(
        `
        DELETE FROM 
            birdbox_images
        WHERE 
            id = ?;
        `,
        [id],
    );

    return result.affectedRows > 0;
}

module.exports = {
    getImageById,
    getImageDownloadById,
    deleteImageById,
};
