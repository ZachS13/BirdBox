const db = require("../../sql/database.js");

const dateFormatter = require("../../utils/date.js");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SPECIES = ["American Kestrel", "Brown Bat", "Other", "Total"];

async function getReportSummary(year, month) {
    const [result] = await db.execute(
        `
        SELECT
            COUNT(species_detections.id) AS totalSightings,
            COUNT(CASE WHEN species.is_target = 1 THEN 1 END) AS totalTargetSightings,
            COUNT(CASE WHEN species.is_target = 0 THEN 1 END) AS totalNonTargetSightings
        FROM
            species_detections
        JOIN
            species ON species_detections.species_id = species.id
        WHERE
            YEAR(species_detections.created_at) = ?
        AND
            MONTH(species_detections.created_at) = ?;
        `,
        [year, month],
    );

    return result.length ? result[0] : null;
}

async function getReportSpeciesAnalysis(year, month) {
    const [result] = await db.execute(
        `
        SELECT
            COUNT(species_detections.id) AS totalSightings,
            COUNT(CASE WHEN species.id = 1 THEN 1 END) AS totalKestrelSightings,
            COUNT(CASE WHEN species.id = 2 THEN 1 END) AS totalBatSightings,
            COUNT(CASE WHEN species.is_target = 0 THEN 1 END) AS totalNonTargetSightings
        FROM
            species_detections
        JOIN
            species ON species_detections.species_id = species.id
        WHERE
            YEAR(species_detections.created_at) = ?
        AND
            MONTH(species_detections.created_at) = ?;
        `,
        [year, month],
    );

    return result.length ? result[0] : null;
}

async function getReportSeasonalHistory(month) {
    const [result] = await db.query(
        `
        SELECT
            COUNT(species_detections.id) AS Total,
            DATE_FORMAT(species_detections.created_at, "%Y-%m-%d") AS Month,
            COUNT(CASE WHEN species.id = 1 THEN 1 END) AS "American Kestrel",
            COUNT(CASE WHEN species.id = 2 THEN 1 END) AS "Brown Bat",
            COUNT(CASE WHEN species.is_target = 0 THEN 1 END) AS Other
        FROM
            species_detections
        JOIN
            species ON species_detections.species_id = species.id
        WHERE
            species_detections.created_at >= DATE_FORMAT(NOW(), "%Y-01-01")
        AND
            species_detections.created_at <= NOW()
        GROUP BY
            MONTH(species_detections.created_at)
        ORDER BY
            species_detections.created_at ASC;
        `,
    );

    const seasonalDates = MONTHS.slice(0, month);

    const chartData = seasonalDates.reduce((acc, date) => {
        acc[date] = { Month: date };

        SPECIES.forEach((name) => (acc[date][name] = 0));

        return acc;
    }, {});

    seasonalDates.forEach((date) => {
        const data = result.find(({ Month }) => dateFormatter.formatDateToLocale(Month, "en-US", false) === date);

        if (data) SPECIES.forEach((name) => (chartData[date][name] = data[name]));
    });

    console.log(Object.values(chartData));

    return chartData ? Object.values(chartData) : null;
}

module.exports = {
    getReportSummary,
    getReportSpeciesAnalysis,
    getReportSeasonalHistory,
};
