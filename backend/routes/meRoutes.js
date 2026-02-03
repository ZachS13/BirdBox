const express = require('express');
const router = express.Router();

const business = require('../businessLayer');

router.get('/me', async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const user = await business.getMe({ token });

        res.status(200).json({
            ok: true,
            message: 'Current user (stub)',
            data: user
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;