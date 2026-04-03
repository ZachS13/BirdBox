const cors = require("cors");
const express = require("express");

const authRoutes = require("./assets/scripts/routes/authRoutes.js");
const meRoutes = require("./assets/scripts/routes/meRoutes.js");
const userRoutes = require("./assets/scripts/routes/userRoutes.js");
const boxRoutes = require("./assets/scripts/routes/birdBoxRoutes.js");
const detectionRoutes = require("./assets/scripts/routes/detectionRoutes.js");
const analyticsRoutes = require("./assets/scripts/routes/analyticsRoutes.js");
const imageRoutes = require("./assets/scripts/routes/imageRoutes.js");
const maintenanceRoutes = require("./assets/scripts/routes/maintenanceRoutes.js");
const exportRoutes = require("./assets/scripts/routes/exportRoutes.js");
const speciesRoutes = require("./assets/scripts/routes/speciesRoutes.js");

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Mounted  Routes
app.use("/", meRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/boxes", boxRoutes);
app.use("/images", imageRoutes);
app.use("/assets/images", express.static("assets/images"));
app.use("/maintenance", maintenanceRoutes);
app.use("/species", speciesRoutes);
app.use("/detections", detectionRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/exports", exportRoutes);

// Server Initiation
app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));
