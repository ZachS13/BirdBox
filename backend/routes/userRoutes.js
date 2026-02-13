const express = require('express');
const router = express.Router();

const business = require('../businessLayer');

router.get('/', async (req, res) => {
    try {
        const users = await business.listUsers();
        res.status(200).json({ ok: true, message: 'Users list (stub)', data: users });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

// Create user (REST-correct)
router.post('/', async (req, res) => {
    try {
        const created = await business.createUser(req.body);
        res.status(201).json({ ok: true, message: 'User created (stub)', data: created });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await business.getUserById(req.params.id);
        res.status(200).json({ ok: true, message: 'User by ID (stub)', data: user });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

// Update user (use PATCH normally, but keeping your earlier POST style is fine if you want)
// I’ll implement PATCH since it’s standard:
router.patch('/:id', async (req, res) => {
    try {
        const updated = await business.updateUser(req.params.id, req.body);
        res.status(200).json({ ok: true, message: 'User updated (stub)', data: updated });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await business.deleteUser(req.params.id);
        res.status(200).json({ ok: true, message: 'User deleted (stub)', data: result });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;