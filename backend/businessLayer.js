const authQueries = require('./queries/authQueries');
const sessionQueries = require('./queries/sessionQueries');
const userQueries = require('./queries/userQueries');
const boxQueries = require('./queries/boxQueries');
const detectionQueries = require('./queries/detectionQueries');
const analyticsQueries = require('./queries/analyticsQueries');
const imageQueries = require('./queries/imageQueries');
const maintenanceQueries = require('./queries/maintenanceQueries');
const exportQueries = require('./queries/exportQueries');
const speciesQueries = require('./queries/speciesQueries');

function badRequest(msg) {
    const e = new Error(msg);
    e.status = 400;
    return e;
}
function unauthorized(msg = 'Unauthorized') {
    const e = new Error(msg);
    e.status = 401;
    return e;
}

/* ---------------- AUTH ---------------- */
async function loginUser({ username, password }) {
    if (!username || !password) throw badRequest('username and password are required');

    const user = await authQueries.findUserByUsername(username);
    if (!user) throw unauthorized('Invalid username or password');

    // TODO: compare password to stored hash
    const token = 'stub-token';
    const refreshToken = 'stub-refresh';

    await sessionQueries.createSession({ userId: user.id, token, refreshToken });
    return { token, refreshToken, user: { id: user.id, username: user.username } };
}

async function refreshAuth({ refreshToken }) {
    const rotated = await sessionQueries.rotateRefreshToken({ refreshToken });
    if (!rotated) throw unauthorized('Invalid refresh token');
    return rotated;
}

async function logoutUser({ token }) {
    if (!token) throw badRequest('Missing token');
    return sessionQueries.deleteSessionByToken(token);
}

/* ---------------- ME ---------------- */
async function getMe({ token }) {
    const session = await sessionQueries.getSessionByToken(token);
    if (!session) throw unauthorized();
    return userQueries.getUserById(session.userId);
}

/* ---------------- USERS ---------------- */
async function listUsers() {
    return userQueries.getAllUsers();
}

async function getUserById(id) {
    return userQueries.getUserById(id);
}

async function createUser(userData) {
    if (!userData?.username) throw badRequest('username is required');
    return userQueries.createUser(userData);
}

// Diagram says PUT /users (update current user profile) and DELETE /users (delete current user profile)
// These assume “current user” is derived from token/session.
async function updateCurrentUser({ token, updates }) {
    const session = await sessionQueries.getSessionByToken(token);
    if (!session) throw unauthorized();
    return userQueries.updateUserById(session.userId, updates);
}

async function deleteCurrentUser({ token }) {
    const session = await sessionQueries.getSessionByToken(token);
    if (!session) throw unauthorized();
    return userQueries.deleteUserById(session.userId);
}

/* ---------------- BOXES ---------------- */
async function listBoxes() {
    return boxQueries.getAllBoxes();
}
async function createBox(data) {
    return boxQueries.createBox(data);
}
async function getBoxById(id) {
    return boxQueries.getBoxById(id);
}
async function updateBox(id, data) {
    return boxQueries.updateBoxById(id, data);
}
async function deleteBox(id) {
    return boxQueries.deleteBoxById(id);
}

async function getBoxSummary(id) {
    return boxQueries.getBoxSummary(id);
}
async function getBoxTelemetry(id) {
    return boxQueries.getBoxTelemetry(id);
}
async function getBoxDetections(id) {
    return boxQueries.getBoxDetections(id);
}
async function getBoxImages(id) {
    return boxQueries.getBoxImages(id);
}

async function listBoxMaintenanceLogs(boxId) {
    return boxQueries.getBoxMaintenanceLogs(boxId);
}
async function createBoxMaintenanceLog(boxId, data) {
    return boxQueries.createBoxMaintenanceLog(boxId, data);
}
async function updateBoxMaintenanceLog(boxId, logId, data) {
    return boxQueries.updateBoxMaintenanceLog(boxId, logId, data);
}
async function deleteBoxMaintenanceLog(boxId, logId) {
    return boxQueries.deleteBoxMaintenanceLog(boxId, logId);
}

async function getBoxMaintenanceSchedule(boxId) {
    return boxQueries.getBoxMaintenanceSchedule(boxId);
}
async function createBoxMaintenanceSchedule(boxId, data) {
    return boxQueries.createBoxMaintenanceSchedule(boxId, data);
}
async function updateBoxMaintenanceSchedule(boxId, scheduleId, data) {
    return boxQueries.updateBoxMaintenanceSchedule(boxId, scheduleId, data);
}
async function deleteBoxMaintenanceSchedule(boxId, scheduleId) {
    return boxQueries.deleteBoxMaintenanceSchedule(boxId, scheduleId);
}

async function getBoxSettings(boxId) {
    return boxQueries.getBoxSettings(boxId);
}
async function updateBoxSettings(boxId, data) {
    return boxQueries.updateBoxSettings(boxId, data);
}

/* ---------------- DETECTIONS ---------------- */
async function getDetectionById(id) {
    return detectionQueries.getDetectionById(id);
}

/* ---------------- ANALYTICS ---------------- */
async function analyticsIdentifiedSpecies() {
    return analyticsQueries.getIdentifiedSpecies();
}
async function analyticsOccupancyTrend() {
    return analyticsQueries.getOccupancyTrend();
}
async function analyticsDailyActivity() {
    return analyticsQueries.getDailyActivity();
}
async function analyticsTargetEfficiency() {
    return analyticsQueries.getTargetEfficiency();
}

/* ---------------- IMAGES ---------------- */
async function getImageById(id) {
    return imageQueries.getImageById(id);
}
async function downloadImageById(id) {
    return imageQueries.getImageDownloadById(id);
}
async function deleteImageById(id) {
    return imageQueries.deleteImageById(id);
}

/* ---------------- MAINTENANCE ---------------- */
async function getMaintenanceLogById(id) {
    return maintenanceQueries.getMaintenanceLogById(id);
}
async function getMaintenanceScheduleById(id) {
    return maintenanceQueries.getMaintenanceScheduleById(id);
}

/* ---------------- EXPORTS ---------------- */
async function listExports() {
    return exportQueries.getExports();
}
async function getExportById(id) {
    return exportQueries.getExportById(id);
}
async function createExport(data) {
    return exportQueries.createExport(data);
}
async function deleteExport(id) {
    return exportQueries.deleteExportById(id);
}

/* ---------------- SPECIES ---------------- */
async function listSpecies() {
    return speciesQueries.getAllSpecies();
}
async function getSpeciesById(id) {
    return speciesQueries.getSpeciesById(id);
}
async function createSpecies(data) {
    return speciesQueries.createSpecies(data);
}
async function updateSpecies(id, data) {
    return speciesQueries.updateSpeciesById(id, data);
}
async function deleteSpecies(id) {
    return speciesQueries.deleteSpeciesById(id);
}

module.exports = {
    loginUser,
    refreshAuth,
    logoutUser,
    getMe,

    listUsers,
    getUserById,
    createUser,
    updateCurrentUser,
    deleteCurrentUser,

    listBoxes,
    createBox,
    getBoxById,
    updateBox,
    deleteBox,
    getBoxSummary,
    getBoxTelemetry,
    getBoxDetections,
    getBoxImages,
    listBoxMaintenanceLogs,
    createBoxMaintenanceLog,
    updateBoxMaintenanceLog,
    deleteBoxMaintenanceLog,
    getBoxMaintenanceSchedule,
    createBoxMaintenanceSchedule,
    updateBoxMaintenanceSchedule,
    deleteBoxMaintenanceSchedule,
    getBoxSettings,
    updateBoxSettings,

    getDetectionById,

    analyticsIdentifiedSpecies,
    analyticsOccupancyTrend,
    analyticsDailyActivity,
    analyticsTargetEfficiency,

    getImageById,
    downloadImageById,
    deleteImageById,

    getMaintenanceLogById,
    getMaintenanceScheduleById,

    listExports,
    getExportById,
    createExport,
    deleteExport,

    listSpecies,
    getSpeciesById,
    createSpecies,
    updateSpecies,
    deleteSpecies
};