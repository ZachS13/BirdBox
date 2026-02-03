async function getAllSpecies() {
    return [];
}
async function getSpeciesById(id) {
    return { id: Number(id), commonName: 'stub', scientificName: 'stub' };
}
async function createSpecies(data) {
    return { id: 1, ...data };
}
async function updateSpeciesById(id, data) {
    return { id: Number(id), ...data };
}
async function deleteSpeciesById(id) {
    return { deleted: true, id: Number(id) };
}

module.exports = {
    getAllSpecies,
    getSpeciesById,
    createSpecies,
    updateSpeciesById,
    deleteSpeciesById
};