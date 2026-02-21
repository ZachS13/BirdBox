const express = require('express');
const router = express.Router();

const business = require('../businessLayer');

router.get('/', async (req, res) => {
    try {
        const users = await business.listUsers();
        return res.status(200).json({ success: true, message: 'Users list', data: users });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const created = await business.createUser(req.body);
        return res.status(201).json({ success: true, message: 'User created', data: created });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await business.getUserById(req.params.id);
        return res.status(200).json({ success: true, message: 'User by ID', data: user });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const updated = await business.updateCurrentUser(req.params.id, req.body);
        if (!updated.updated) {
            if (updated.reason === "user_not_found") {
                return res.status(404).json({ success: false, message: "User not found" });
            } else {
                return res.status(200).json({ success: true, message: 'No changes made', data: updated });
            }
        } else {
            return res.status(200).json({ success: true, message: 'User updated', data: updated });
        }
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await business.deleteCurrentUser(req.params.id);
        if (!result.deleted) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({ success: true, message: 'User deleted', data: result });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;