const express = require('express');
const router = express.Router();

const business = require('../businessLayer');

router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const user = await business.getMe({ token });

        res.status(200).json({
            ok: true,
            message: 'Current user (stub)',
            data: user
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