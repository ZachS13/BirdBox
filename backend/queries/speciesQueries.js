const pool = require('../db');

async function getAllSpecies() {
    const [rows] = await pool.query(
        'SELECT * FROM species ORDER BY id DESC'
    );
    return rows;
}

async function getSpeciesById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM species WHERE id = ?',
        [id]
    );

    return rows[0] || null;
}

async function createSpecies(data) {
    const { name, is_target } = data;

    const [result] = await pool.query(
        `INSERT INTO species (name, is_target, created_at)
        VALUES (?, ?, NOW())`,
        [name, is_target]
    );

    return { id: result.insertId };
}

async function updateSpeciesById(id, data) {
    const { name, is_target } = data;

    await pool.query(
        `UPDATE species
        SET name = ?, is_target = ?, updated_at = NOW()
        WHERE id = ?`,
        [name, is_target, id]
    );

    return { updated: true };
}

async function deleteSpeciesById(id) {
    await pool.query('DELETE FROM species WHERE id = ?', [id]);
    return { deleted: true };
}

module.exports = {
    getAllSpecies,
    getSpeciesById,
    createSpecies,
    updateSpeciesById,
    deleteSpeciesById
};
