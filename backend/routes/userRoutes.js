const express = require('express');
const router = express.Router();

const business = require('../businessLayer');

router.get('/', async (req, res, next) => {
    try {
        const users = await business.listUsers();
        res.status(200).json({ ok: true, message: 'Users list (stub)', data: users });
    } catch (err) {
        next(err);
    }
});

// Create user (REST-correct)
router.post('/', async (req, res, next) => {
    try {
        const created = await business.createUser(req.body);
        res.status(201).json({ ok: true, message: 'User created (stub)', data: created });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await business.getUserById(req.params.id);
        res.status(200).json({ ok: true, message: 'User by ID (stub)', data: user });
    } catch (err) {
        next(err);
    }
});

// Update user (use PATCH normally, but keeping your earlier POST style is fine if you want)
// I’ll implement PATCH since it’s standard:
router.patch('/:id', async (req, res, next) => {
    try {
        const updated = await business.updateUser(req.params.id, req.body);
        res.status(200).json({ ok: true, message: 'User updated (stub)', data: updated });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await business.deleteUser(req.params.id);
        res.status(200).json({ ok: true, message: 'User deleted (stub)', data: result });
    } catch (err) {
        next(err);
    }
});

module.exports = router;