const bcrypt = require("bcrypt");

const authQueries = require("../scripts/queries/authQueries.js");
const sessionQueries = require("../scripts/queries/sessionQueries.js");
const userQueries = require("../scripts/queries/userQueries.js");
const boxQueries = require("../scripts/queries/birdBoxQueries.js");
const detectionQueries = require("../scripts/queries/detectionQueries.js");
const analyticsQueries = require("../scripts/queries/analyticsQueries.js");
const imageQueries = require("../scripts/queries/imageQueries.js");
const maintenanceQueries = require("../scripts/queries/maintenanceQueries.js");
const exportQueries = require("../scripts/queries/exportQueries.js");
const speciesQueries = require("../scripts/queries/speciesQueries.js");

/* ---------------- ERROR ---------------- */

function badRequest(msg) {
    const e = new Error(msg);
    e.status = 400;
    return e;
}

function unauthorized(msg = "Unauthorized") {
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
async function login(username, password) {
    if (!username || !password) throw badRequest("All input fields are required.");

    const user = await authQueries.findUserBy("username", username);

    if (!user) throw unauthorized("Invalid credentials provided.");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw unauthorized("Invalid credentials provided.");

    await authQueries.updateLastLoginAt(user.id);

    const token = await bcrypt.hash(`${user.id}#${username}#${password}`, 10);

    await sessionQueries.createSession(user.id, token);

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    };
}

/**
 * Make a new user account.
 * @returns User ID.
 */
async function signup(email, username, password) {
    if (!email || !username || !password) throw badRequest("All input fields are required.");

    let existingUser = await authQueries.findUserBy("email", email);

    if (existingUser) throw badRequest("User with this email already exists.");

    existingUser = await authQueries.findUserBy("username", username);

    if (existingUser) throw badRequest("User with this username already exists.");

    if (password.length < 8) throw badRequest("Password must be at least 8 characters.");

    const hashed = await bcrypt.hash(password, 10);

    const user = await userQueries.createNewUser(email, username, hashed);

    const token = await bcrypt.hash(`${user.id}#${username}#${hashed}`, 10);

    await sessionQueries.createSession(user.id, token);

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    };
}

/**
 * Update the token to be up to date.
 * @returns Token ID.
 */
async function refreshAuth(refreshToken) {
    const rotated = await sessionQueries.refreshToken({ refreshToken });

    if (!rotated) throw unauthorized("Invalid refresh token.");

    return rotated;
}

/**
 * Log out the user.
 * @returns Token ID.
 */
async function logout(token) {
    if (!token) throw badRequest("Missing token.");

    return sessionQueries.deleteSessionByToken(token);
}

/* ---------------- ME ---------------- */

/**
 * Get the user using the current session
 * @returns User Object
 */
async function getMe(token) {
    if (!token) throw unauthorized("Missing auth token.");

    const session = await sessionQueries.getSessionByToken(token);

    if (!session) throw unauthorized("Invalid auth token.");

    const user = await userQueries.getUserBy("id", session["user_id"]);

    if (!user) throw unauthorized("Invalid user account.");

    return user;
}

/* ---------------- USERS ---------------- */

/**
 * @returns Array of all users.
 */
async function listAllUsers() {
    return userQueries.getAllUsers();
}

/**
 * @param {Integer} id - Id of the user.
 * @returns User object.
 */
async function getUserById(id) {
    if (!id) throw badRequest("User ID is required.");

    const user = await userQueries.getUserById(id);

    if (!user) throw notFound("User not found.");

    return user;
}

/**
 * Create a user (admin-style endpoint, not /auth/signup)
 * Expects: { name, email, password}
 * - hashes password and stores in password_hash
 * @returns ID of the user created.
 */
async function createNewUser(data) {
    const email = data.email;

    if (!email) throw badRequest("Email is required.");

    const existing = await userQueries.findUserByEmail(email);

    if (existing) throw conflict("Email already registered.");

    const username = data.username;

    if (!username) throw badRequest("Username is required.");

    const password = data.password;

    if (!password) throw badRequest("Password is required.");

    if (password.length < 8) throw badRequest("Password must be at least 8 characters.");

    const hashed = await bcrypt.hash(password, 10);

    return userQueries.createNewUser({ username, email, hashed });
}

/**
 * Update the current user.
 * @returns User object.
 */
async function updateCurrentUser(userId, user) {
    // const session = await sessionQueries.getSessionByToken(token);

    // if (!session) throw unauthorized();

    const email = user.email;

    if (!email) throw badRequest("Email is required.");

    const existingUser = await userQueries.getUserBy("email", email);

    if (existingUser && existingUser.id !== userId) throw conflict("User with this email already exists.");

    const username = user.username;

    if (!username) throw badRequest("Username is required.");

    const currentPassword = user.currentPassword;

    if (!currentPassword) throw unauthorized("Current password must be provided.");

    const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password);

    if (!isPasswordValid) throw unauthorized("Invalid current password provided.");

    const hashed = await bcrypt.hash(user.confirmPassword, 10);

    return userQueries.updateUserById(userId, { email, username, hashed });
}

/**
 * Delete the current user.
 * @returns Rows affected.
 */
async function deleteCurrentUser(userId) {
    // const session = await sessionQueries.getSessionByToken(token);

    // if (!session) throw unauthorized();

    return userQueries.deleteUserById(userId);
}

/* ---------------- BOXES ---------------- */

async function listAllBoxes() {
    return boxQueries.getAllBoxes();
}

async function createNewBox(data) {
    const name = data.name;

    if (!name) throw badRequest("Box name is required.");

    const trail = data.trail;

    if (!trail) throw badRequest("Box location name is required.");

    const lat = data.lat;

    if (!lat) throw badRequest("Box latitude is required.");

    const lng = data.lng;

    if (!lng) throw badRequest("Box longitude is required.");

    return boxQueries.createNewBox(data);
}
async function getBoxById(id) {
    const box = await boxQueries.getBoxById(id);

    if (!box) throw notFound("Box was not found.");

    return box;
}

async function updateBox(id, data) {
    // TODO: Validate inputs.

    const box = boxQueries.updateBoxById(id, data);

    if (!box) throw notFound("Box was not found.");

    return box;
}

async function deleteBoxById(id) {
    if (!id) throw badRequest("Box ID is required");

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

async function getAllMaintenanceSchedulesByBoxId(boxId, isPerTimeline) {
    if (!isPerTimeline) return await maintenanceQueries.getAllMaintenanceSchedulesByBoxId(boxId);

    const past = await maintenanceQueries.getAllMaintenanceSchedulesByBoxId(boxId, "past");
    const upcoming = await maintenanceQueries.getAllMaintenanceSchedulesByBoxId(boxId, "upcoming");

    return { past, upcoming };
}

async function getMaintenanceScheduleById(id, boxId) {
    return maintenanceQueries.getMaintenanceScheduleById(id, boxId);
}

async function createNewMaintenanceSchedule(boxId, data) {
    return maintenanceQueries.createNewMaintenanceSchedule(boxId, data);
}

async function updateMaintenanceScheduleStatus(id, boxId, body) {
    return maintenanceQueries.updateMaintenanceScheduleStatus(id, boxId, body);
}

async function deleteMaintenanceSchedule(id, boxId) {
    return maintenanceQueries.deleteMaintenanceScheduleById(id, boxId);
}

/* ---------------- EXPORTS ---------------- */

async function listExports() {
    return exportQueries.getExports();
}

async function getExportById(id) {
    if (!id) throw badRequest("Export id is required.");

    const data = await exportQueries.getExportById(id);

    if (!data) throw notFound("Export was not found.");

    return data;
}

/* ---------------- SPECIES ---------------- */

async function listSpecies() {
    return speciesQueries.getAllSpecies();
}

async function getSpeciesById(id) {
    if (!id) throw badRequest("Specie ID is required.");

    const species = await speciesQueries.getSpeciesById(id);

    if (!species) throw notFound("Specie was not found.");

    return species;
}

async function createSpecies(data) {
    if (!data.name) throw badRequest("Specie name is required.");

    const specie = await speciesQueries.getSpeciesByName(data.name);

    if (specie) throw conflict("Specie already exists.");

    return speciesQueries.createSpecies(data);
}

async function updateSpecies(id, data) {
    if (!id) throw badRequest("Specie ID is required.");

    return speciesQueries.updateSpeciesById(id, data);
}

async function deleteSpecies(id) {
    if (!id) throw badRequest("Species ID is required.");

    return speciesQueries.deleteSpeciesById(id);
}

module.exports = {
    // AUTH
    login,
    signup,
    refreshAuth,
    logout,
    getMe,

    // USERS
    listAllUsers,
    getUserById,
    createNewUser,
    updateCurrentUser,
    deleteCurrentUser,

    // BOXES
    listAllBoxes,
    createNewBox,
    getBoxById,
    updateBox,
    deleteBoxById,
    getBoxSummary,
    getBoxTelemetry,
    getBoxDetections,
    getBoxImages,

    // DETECTIONS
    getDetectionById,

    // ANALYTICS
    analyticsIdentifiedSpecies,
    analyticsOccupancyTrend,
    analyticsDailyActivity,
    analyticsTargetEfficiency,

    // IMAGES
    getImageById,
    downloadImageById,
    deleteImageById,

    // MAINTENANCE
    getAllMaintenanceSchedulesByBoxId,
    getMaintenanceScheduleById,
    createNewMaintenanceSchedule,
    updateMaintenanceScheduleStatus,
    deleteMaintenanceSchedule,

    // EXPORTS
    listExports,
    getExportById,

    // SPECIES
    listSpecies,
    getSpeciesById,
    createSpecies,
    updateSpecies,
    deleteSpecies,
};
