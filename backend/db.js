const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'student123',
    database: 'birdbox_db'
});

module.exports = pool;