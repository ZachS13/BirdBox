const express = require("express");

const business = require("../../layers/business.js");

const router = express.Router();

router.get("/", async (_, res) => {
    try {
        const users = await business.listAllUsers();

        res.status(200).json({ success: true, message: "Users list retrieved.", data: users });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await business.getUserById(req.params.id);

        res.status(200).json({ success: true, message: `User with ID ${req.params.id} was retrieved`, data: user });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await business.createNewUser(req.body);

        res.status(200).json({ success: true, message: "User created successfully.", data: user });
    } catch (e) {
        const status = e.status || 500;
        res.status(status).json({
            success: false,
            message: e.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await business.updateCurrentUser(+req.params.id, req.body);

        if (!updated.success) {
            if (updated.reason === "user_not_found") return res.status(404).json({ success: false, message: "User was not found." });

            return res.status(200).json({ success: true, message: "No changes were necessary.", data: updated });
        }

        res.status(200).json({ success: true, message: "Profile updated successfully.", data: updated });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await business.deleteCurrentUser(req.params.id);

        // Guard clause.
        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: "User was not found.",
            });
        }

        res.status(200).json({ success: true, message: "User deleted successfully.", data: result });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

module.exports = router;
