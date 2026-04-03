const db = require("../../sql/database.js");

async function getAllSpecies() {
    const [species] = await db.query(
        `
        SELECT 
            id,
            name,
            is_target AS isTarget 
        FROM 
            species;
        `,
    );

    return species.length ? species : null;
}

async function getSpeciesBy(column, value) {
    const [species] = await db.execute(
        `
        SELECT 
            id,
            name,
            is_target AS isTarget 
        FROM 
            species 
        WHERE 
            ${column} = ?;
        `,
        [value],
    );

    return species[0] || null;
}

async function createNewSpecies(data) {
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
            is_target = ?
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
    getSpeciesBy,
    createNewSpecies,
    updateSpeciesById,
    deleteSpeciesById,
};
