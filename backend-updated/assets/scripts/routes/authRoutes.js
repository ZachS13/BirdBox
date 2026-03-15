const express = require("express");

const business = require("../../layers/business.js");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await business.login(username, password);

        res.status(200).json({ success: true, message: "Login was successful!", data: result });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

// router.post("/refresh", async (req, res) => {
//     try {
//         const { refreshToken } = req.body;

//         const result = await business.refreshAuth(refreshToken);

//         res.status(200).json({ success: true, message: "Refresh Successful", data: result });
//     } catch (e) {
//         res.status(e.status || 500).json({
//             success: false,
//             message: e.message,
//         });
//     }
// });

router.post("/signup", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const result = await business.signup(email, username, password);

        res.status(201).json({ success: true, message: "User Created Successfully", data: result });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.post("/logout", async (req, res) => {
    try {
        // Example token read (you can change to cookies later).
        const token = req.headers.authorization?.split(" ")[1];

        const result = await business.logout(token);

        res.status(200).json({ success: true, message: "Logout Successful", data: result });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

module.exports = router;
