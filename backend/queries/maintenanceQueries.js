async function getMaintenanceLogById(id) {
    return { id: Number(id), type: 'log', data: {} };
}

async function getMaintenanceScheduleById(id) {
    return { id: Number(id), type: 'schedule', data: {} };
}

module.exports = {
    getMaintenanceLogById,
    getMaintenanceScheduleById
};