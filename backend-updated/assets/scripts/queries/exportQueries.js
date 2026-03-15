const db = require("../../sql/database.js");

async function getAllExports() {
    const [rows] = await db.query(
        `
        SELECT 
            * 
        FROM 
            exports;
        `,
    );

    return rows.length ? rows : null;
}

async function getExportById(id) {
    const [rows] = await db.execute(
        `
        SELECT 
            * 
        FROM 
            exports 
        WHERE 
            id = ?;
        `,
        [id],
    );

    return rows[0] || null;
}

module.exports = {
    getAllExports,
    getExportById,
};
