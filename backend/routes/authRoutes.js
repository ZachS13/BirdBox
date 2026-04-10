const express = require('express');
const router = express.Router();

const business = require('../businessLayer');

const getClientIp = (req) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    return ip === '::1' ? '127.0.0.1' : ip;
};

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const clientIp = getClientIp(req);
        const result = await business.loginUser({ username, password, clientIp });
        res.status(200).json({ success: true, message: 'Login success', data: result });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/logout', async (req, res) => {
    try {
        // Example token read (you can change to cookies later)
        const token = req.headers.authorization?.replace('Bearer ', '');
        const result = await business.logoutUser({ token });
        res.status(200).json({ success: true, message: 'Logout success', data: result });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const result = await business.refreshAuth({ refreshToken });
        res.status(200).json({ success: true, message: 'Refresh success', data: result });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log("Signup request received:", { username, email });
        const result = await business.signup(username, email, password);

        res.status(201).json({ success: true, message: "User created successfully", data: result });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;