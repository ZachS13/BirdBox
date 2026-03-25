const authQueries = require('./queries/authQueries.js'),
      sessionQueries = require('./queries/sessionQueries.js'),
      userQueries = require('./queries/userQueries.js'),
      boxQueries = require('./queries/birdboxQueries.js'),
      detectionQueries = require('./queries/detectionQueries.js'),
      analyticsQueries = require('./queries/analyticsQueries.js'),
      imageQueries = require('./queries/imageQueries.js'),
      maintenanceQueries = require('./queries/maintenanceQueries.js'),
      exportQueries = require('./queries/exportQueries.js'),
      speciesQueries = require('./queries/speciesQueries.js');

const bcrypt = require("bcrypt");

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

function notFound(msg = "Not found") {
    const e = new Error(msg);
    e.status = 404;
    return e;
}

function conflict(msg = "Conflict") {
    const e = new Error(msg);
    e.status = 409;
    return e;
}

/* ---------------- AUTH ---------------- */
/**
 * Login as a user.
 * @returns Token and User Object w/ ID and username.
 */
async function loginUser({ username, password }) {
    if (!username || !password) {
        throw badRequest("username and password are required");
    }

    const user = await authQueries.findUserByUsername(username);
    if (!user) {
        throw unauthorized("Invalid username or password");
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        throw unauthorized("Invalid username or password");
    }

    // Will be passed into the function later with a hashed and combined username, id, and IP address.
    const token = "stub-token";

    await sessionQueries.createSession({
        userId: user.id,
        token,
    });

    return {
        token,
        user: {
            id: user.id,
            username: user.username
        }
    };
}

/**
 * Make a new user account.
 * @returns User ID.
 */
async function signup(username, email, password) {
    if (!username || !email || !password) {
        throw new Error("Missing required fields");
    }

    const existingUser = await userQueries.findByEmail(email);
    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userQueries.createUser({
        username,
        email,
        password: hashedPassword
    });

    return newUser;
}

/**
 * Update the token to be up to date.
 * @returns Token ID.
 */
async function refreshAuth({ refreshToken }) {
    const rotated = await sessionQueries.refreshToken({ refreshToken });
    if (!rotated) throw unauthorized('Invalid refresh token');
    return rotated;
}

/**
 * Log out the user.
 * @returns Token ID.
 */
async function logoutUser({ token }) {
    if (!token) throw badRequest('Missing token');
    return sessionQueries.deleteSessionByToken(token);
}

/* ---------------- ME ---------------- */
/**
 * Get the user using the current session
 * @returns User Object
 */
async function getMe({ token }) {
    if (!token) throw unauthorized("Missing auth token");

    const session = await sessionQueries.getSessionByToken(token);
    if (!session) throw unauthorized();

    const user = await userQueries.getUserById(session.userId);
    if (!user) throw unauthorized();

    return user;
}

/* ---------------- USERS ---------------- */
/**
 * @returns Array of all users.
 */
async function listUsers() {
    return userQueries.getAllUsers();
}

/**
 * @param {Integer} id - Id of the user.
 * @returns User object.
 */
async function getUserById(id) {
    if (!id) throw badRequest("id is required");

    const user = await userQueries.getUserById(id);
    if (!user) throw notFound("User not found");

    return user;
}

/**
 * Create a user (admin-style endpoint, not /auth/signup)
 * Expects: { name, email, password}
 * - hashes password and stores in password_hash
 * @returns ID of the user created.
 */
async function createUser(userData) {
    const name = userData?.name;
    const email = userData?.email;
    const password = userData?.password;

    if (!name) throw badRequest("name is required");
    if (!email) throw badRequest("email is required");
    if (!password) throw badRequest("password is required");

    const existing = await userQueries.findUserByEmail(email);
    if (existing) throw conflict("Email already registered");

    const passwordHash = await bcrypt.hash(password, 10);

    return userQueries.createUser({ name, email, passwordHash, role });
}

/**
 * Update the current user.
 * @returns User object.
 */
async function updateCurrentUser({ token, updates }) {
    const session = await sessionQueries.getSessionByToken(token);
    if (!session) throw unauthorized();
    return userQueries.updateUserById(session.userId, updates);
}

/**
 * Delete the current user.
 * @returns Rows affected.
 */
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
    const name = data?.name;
    const trailName = data?.trailName;
    const latitude = data?.latitude;
    const longitude = data?.longitude;

    if (!name) throw badRequest("name is required");
    if (latitude === undefined) throw badRequest("latitude is required");
    if (longitude === undefined) throw badRequest("longitude is required");

    if (!trailName) data.trailName = null;

    return boxQueries.createBox(data);
}
async function getBoxById(id) {
    if (!id) throw badRequest("id is required");

    const box = await boxQueries.getBoxById(id);
    if (!box) throw notFound("Box not found");

    return box;
}

async function updateBox(id, data) {
    if (!id) throw badRequest("id is required");

    const name = data?.name;
    const trailName = data?.trailName;
    const latitude = data?.latitude;
    const longitude = data?.longitude;

    if (!name) throw badRequest("name is required");
    if (!trailName) data.trailName = null;
    if (latitude === undefined) throw badRequest("latitude is required");
    if (longitude === undefined) throw badRequest("longitude is required");

    return boxQueries.updateBoxById(id, data);
}

async function deleteBox(id) {
    if (!id) throw badRequest("id is required");

    return boxQueries.deleteBoxById(id);
}

async function getBoxSummary(id) {
    return boxQueries.getBoxSummary(id);
}
async function getBoxTelemetry(id) {
    if (!id) throw badRequest("id is required");

    const telemetry = await boxQueries.getBoxTelemetry(id);
    if (!telemetry) throw notFound("Telemetry not found");

    return telemetry;
}
async function getBoxDetections(id) {
    return boxQueries.getBoxDetections(id);
}
async function getBoxImages(id) {
    if (!id) throw badRequest("id is required");

    const images = await boxQueries.getBoxImages(id);
    if (!images) throw notFound("Images not found");

    return images;
}

async function listBoxMaintenanceLogs(boxId) {
    if (!boxId) throw badRequest("boxId is required");

    const listLogs = await boxQueries.getBoxMaintenanceLogs(boxId);

    return listLogs;
}
async function createBoxMaintenanceLog(boxId, data) {
    if (!boxId) throw badRequest("boxId is required");

    return boxQueries.createBoxMaintenanceLog(boxId, data);
}
async function updateBoxMaintenanceLog(boxId, logId, data) {
    if (!boxId) throw badRequest("boxId is required");
    if (!logId) throw badRequest("logId is required");

    return boxQueries.updateBoxMaintenanceLog(boxId, logId, data);
}
async function deleteBoxMaintenanceLog(boxId, logId) {
    if (!boxId) throw badRequest("boxId is required");
    if (!logId) throw badRequest("logId is required");

    return boxQueries.deleteBoxMaintenanceLog(boxId, logId);
}

async function getBoxMaintenanceSchedule(boxId) {
    if (!boxId) throw badRequest("boxId is required");
    
    return boxQueries.getBoxMaintenanceSchedule(boxId);
}
async function createBoxMaintenanceSchedule(boxId, data) {
    if (!boxId) throw badRequest("boxId is required");

    return boxQueries.createBoxMaintenanceSchedule(boxId, data);
}
async function updateBoxMaintenanceSchedule(boxId, scheduleId, data) {
    if (!boxId) throw badRequest("boxId is required");
    if (!scheduleId) throw badRequest("scheduleId is required");

    return boxQueries.updateBoxMaintenanceSchedule(boxId, scheduleId, data);
}
async function deleteBoxMaintenanceSchedule(boxId, scheduleId) {
    if (!boxId) throw badRequest("boxId is required");
    if (!scheduleId) throw badRequest("scheduleId is required");

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
    if (!id) throw badRequest("id is required");

    const image = await imageQueries.getImageById(id);
    if (!image) throw notFound("Image not found");

    return image;
}

async function downloadImageById(id) {
    return imageQueries.getImageDownloadById(id);
}

async function deleteImageById(id) {
    if (!id) throw badRequest("id is required");

    const delImage = await imageQueries.deleteImageById(id);
    if (!delImage) throw notFound("Image not found");

    return delImage;
}

/* ---------------- MAINTENANCE ---------------- */
async function getMaintenanceLogById(id) {
    if (!id) throw badRequest("id is required");

    const maintenanceLog = await maintenanceQueries.getMaintenanceLogById(id);
    if (!maintenanceLog) throw notFound("Maintenance log not found");

    return maintenanceLog;
}

async function getMaintenanceScheduleById(id) {
    if (!id) throw badRequest("id is required");

    const maintenanceSchedule = await maintenanceQueries.getMaintenanceScheduleById(id);
    if (!maintenanceSchedule) throw notFound("Maintenance schedule not found");

    return maintenanceSchedule;
}

/* ---------------- EXPORTS ---------------- */
async function listExports() {
    return exportQueries.getExports();
}
async function getExportById(id) {
    if (!id) throw badRequest("id is required");

    const exp = await exportQueries.getExportById(id);
    if (!exp) throw notFound("export not found");

    return exp;
}

/* ---------------- SPECIES ---------------- */
async function listSpecies() {
    return speciesQueries.getAllSpecies();
}

async function getSpeciesById(id) {
    if (!id) throw badRequest('species id is required');

    const species = await speciesQueries.getSpeciesById(id);
    if (!species) throw notFound('species not found');

    return species;
}

async function createSpecies(data) {
    if (!data?.name) throw badRequest('name is required');

    const existing = await speciesQueries.getSpeciesByName(data.name);
    if (existing) throw conflict('species already exists');

    return speciesQueries.createSpecies(data);
}

async function updateSpecies(id, data) {
    if (!id) throw badRequest('species id is required');

    return speciesQueries.updateSpeciesById(id, data);
}

async function deleteSpecies(id) {
    if (!id) throw badRequest('species id is required');

    return speciesQueries.deleteSpeciesById(id);
}

module.exports = {
    loginUser,
    signup,
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