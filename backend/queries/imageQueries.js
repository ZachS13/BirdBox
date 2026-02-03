async function getImageById(id) {
    return { id: Number(id), metadata: {} };
}

async function getImageDownloadById(id) {
    // could be a signed URL later
    return { id: Number(id), url: 'https://example.com/stub-signed-url' };
}

async function deleteImageById(id) {
    return { deleted: true, id: Number(id) };
}

module.exports = {
    getImageById,
    getImageDownloadById,
    deleteImageById
};