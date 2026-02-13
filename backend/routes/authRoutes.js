const express = require('express');
const router = express.Router();

const business = require('../businessLayer');

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await business.loginUser({ username, password });
        res.status(200).json({ ok: true, message: 'Login success (stub)', data: result });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/logout', async (req, res, next) => {
    try {
        // Example token read (you can change to cookies later)
        const token = req.headers.authorization?.replace('Bearer ', '');
        const result = await business.logoutUser({ token });
        res.status(200).json({ ok: true, message: 'Logout success (stub)', data: result });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/refresh', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const result = await business.refreshAuth({ refreshToken });
        res.status(200).json({ ok: true, message: 'Refresh success (stub)', data: result });
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

        const result = await businessLayer.signup(username, email, password);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;