const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "student123",
    database: "glt_dashboard",
    dateStrings: ["DATETIME", "TIMESTAMP"],
});

module.exports = db;
