async function getAllBoxes() {
    return [];
}
async function createBox(data) {
    return { id: 10, ...data };
}
async function getBoxById(id) {
    return { id: Number(id), name: 'stub-box' };
}
async function updateBoxById(id, data) {
    return { id: Number(id), ...data };
}
async function deleteBoxById(id) {
    return { deleted: true, id: Number(id) };
}

async function getBoxSummary(boxId) {
    return { boxId: Number(boxId), status: 'stub', lastSeen: null };
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

async function getBoxMaintenanceLogs(boxId) {
    return { boxId: Number(boxId), logs: [] };
}
async function createBoxMaintenanceLog(boxId, data) {
    return { id: 1, boxId: Number(boxId), ...data };
}
async function updateBoxMaintenanceLog(boxId, logId, data) {
    return { id: Number(logId), boxId: Number(boxId), ...data };
}
async function deleteBoxMaintenanceLog(boxId, logId) {
    return { deleted: true, boxId: Number(boxId), logId: Number(logId) };
}

async function getBoxMaintenanceSchedule(boxId) {
    return { boxId: Number(boxId), schedule: null };
}
async function createBoxMaintenanceSchedule(boxId, data) {
    return { id: 1, boxId: Number(boxId), ...data };
}
async function updateBoxMaintenanceSchedule(boxId, scheduleId, data) {
    return { id: Number(scheduleId), boxId: Number(boxId), ...data };
}
async function deleteBoxMaintenanceSchedule(boxId, scheduleId) {
    return { deleted: true, boxId: Number(boxId), scheduleId: Number(scheduleId) };
}

async function getBoxSettings(boxId) {
    return { boxId: Number(boxId), settings: {} };
}
async function updateBoxSettings(boxId, data) {
    return { boxId: Number(boxId), settings: data };
}

module.exports = {
    getAllBoxes,
    createBox,
    getBoxById,
    updateBoxById,
    deleteBoxById,
    getBoxSummary,
    getBoxTelemetry,
    getBoxDetections,
    getBoxImages,
    getBoxMaintenanceLogs,
    createBoxMaintenanceLog,
    updateBoxMaintenanceLog,
    deleteBoxMaintenanceLog,
    getBoxMaintenanceSchedule,
    createBoxMaintenanceSchedule,
    updateBoxMaintenanceSchedule,
    deleteBoxMaintenanceSchedule,
    getBoxSettings,
    updateBoxSettings
};