const authQueries = require('./queries/authQueries'),
      sessionQueries = require('./queries/sessionQueries'),
      userQueries = require('./queries/userQueries'),
      boxQueries = require('./queries/boxQueries'),
      detectionQueries = require('./queries/detectionQueries'),
      analyticsQueries = require('./queries/analyticsQueries'),
      imageQueries = require('./queries/imageQueries'),
      maintenanceQueries = require('./queries/maintenanceQueries'),
      exportQueries = require('./queries/exportQueries'),
      speciesQueries = require('./queries/speciesQueries');

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
    const rotated = await sessionQueries.rotateRefreshToken({ refreshToken });
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