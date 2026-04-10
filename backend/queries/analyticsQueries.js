const db = require("../db");

async function getIdentifiedSpecies() {
    return { series: [] };
}
async function getOccupancyTrend() {
    return { series: [] };
}

async function getMonthlyActivity() {
    const sql = `
        SELECT 
            DATE_FORMAT(created_at, '%b') AS Month,
            SUM(CASE WHEN species_id = 1 THEN 1 ELSE 0 END) AS 'American Kestrel',
            SUM(CASE WHEN species_id = 2 THEN 1 ELSE 0 END) AS 'Brown Bat',
            SUM(CASE WHEN species_id = 3 THEN 1 ELSE 0 END) AS 'Other',
            COUNT(*) AS Total
        FROM species_detections
        WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 8 MONTH)
        GROUP BY YEAR(created_at), MONTH(created_at), DATE_FORMAT(created_at, '%b')
        ORDER BY YEAR(created_at), MONTH(created_at);
    `;

    const [rows] = await db.execute(sql);
    return rows;
}

async function getWeeklyActivity() {
    const sql = `
        SELECT
            d.date,
            s.name,
            COALESCE(COUNT(sd.id), 0) AS detections
        FROM (
            SELECT CURDATE() - INTERVAL 6 DAY AS date
            UNION ALL SELECT CURDATE() - INTERVAL 5 DAY
            UNION ALL SELECT CURDATE() - INTERVAL 4 DAY
            UNION ALL SELECT CURDATE() - INTERVAL 3 DAY
            UNION ALL SELECT CURDATE() - INTERVAL 2 DAY
            UNION ALL SELECT CURDATE() - INTERVAL 1 DAY
            UNION ALL SELECT CURDATE()
        ) d
        CROSS JOIN species s
        LEFT JOIN species_detections sd
            ON sd.species_id = s.id
            AND DATE(sd.created_at) = d.date
        GROUP BY d.date, s.id, s.name
        ORDER BY d.date;
    `;

    const [rows] = await db.execute(sql);
    return rows;
}

async function getDailyActivity() {
    const sql = `
        SELECT s.name, COUNT(sd.id) AS detections
        FROM species s
        LEFT JOIN species_detections sd
            ON s.id = sd.species_id
            AND sd.created_at >= CURDATE()
            AND sd.created_at < CURDATE() + INTERVAL 1 DAY
        GROUP BY s.id, s.name;
    `;

    const [rows] = await db.execute(sql);
    return rows;
}

async function getActivityByDate(date) {
    const sql = `
        SELECT s.name, COUNT(sd.id) AS detections_on_date
        FROM species s
        LEFT JOIN species_detections sd
            ON s.id = sd.species_id
            AND DATE(sd.created_at) = ?
        GROUP BY s.id, s.name;
    `;

    const [rows] = await db.execute(sql, [date]);
    return rows;
}

async function getTargetEfficiency() {
    return { target: 0, nonTarget: 0 };
}

module.exports = {
    getIdentifiedSpecies,
    getOccupancyTrend,
    getMonthlyActivity,
    getWeeklyActivity,
    getDailyActivity,
    getActivityByDate,
    getTargetEfficiency
};