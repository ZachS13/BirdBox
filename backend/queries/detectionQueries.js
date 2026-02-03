async function getDetectionById(id) {
    return { id: Number(id), result: 'stub-detection' };
}

module.exports = { getDetectionById };