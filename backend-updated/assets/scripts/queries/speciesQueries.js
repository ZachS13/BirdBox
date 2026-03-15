const db = require("../../sql/database.js");

async function getAllSpecies() {
    const [rows] = await db.query(
        `
        SELECT 
            * 
        FROM 
            species 
        ORDER BY 
            id DESC;
        `,
    );

    return rows.length ? rows : null;
}

async function getSpeciesById(id) {
    const [rows] = await db.execute(
        `
        SELECT 
            * 
        FROM 
            species 
        WHERE 
            id = ?;
        `,
        [id],
    );

    return rows[0] || null;
}

async function createSpecies(data) {
    const { name, isTarget } = data;

    const [result] = await db.execute(
        `
        INSERT INTO species (
            name, 
            is_target, 
            created_at
        )
        VALUES (?, ?, NOW());
        `,
        [name, isTarget],
    );

    return result.insertId;
}

async function updateSpeciesById(id, data) {
    const { name, isTarget } = data;

    const [result] = await db.execute(
        `
        UPDATE 
            species
        SET 
            name = ?, 
            is_target = ?, 
            updated_at = NOW()
        WHERE 
            id = ?;
        `,
        [name, isTarget, id],
    );

    return result.affectedRows > 0;
}

async function deleteSpeciesById(id) {
    const [result] = await db.execute(
        `
        DELETE FROM 
            species 
        WHERE 
            id = ?;
        `,
        [id],
    );

    return result.affectedRows > 0;
}

module.exports = {
    getAllSpecies,
    getSpeciesById,
    createSpecies,
    updateSpeciesById,
    deleteSpeciesById,
};
