const express = require("express");

const business = require("../../layers/business.js");

const router = express.Router();

router.get("/me", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        const user = await business.getMe(token);

        res.status(200).json({
            success: true,
            message: `Current user (${user.username}) is active.`,
            data: user,
        });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

module.exports = router;
