const db = require("../../sql/database.js");

const dateFormatter = require("../../utils/date.js");

const SPECIES = ["American Kestrel", "Brown Bat", "Other"];

async function getAllBoxes() {
    const [boxes] = await db.query(
        `
        SELECT 
            birdboxes.id, 
            birdboxes.name, 
            birdboxes.trail_name AS trail, 
            birdboxes.latitude AS lat, 
            birdboxes.longitude AS lng, 
            birdboxes.notes,
            birdbox_telemetry.battery_life AS battery
        FROM 
            birdboxes
        JOIN
            birdbox_telemetry
        ON
            birdboxes.id = birdbox_telemetry.birdbox_id;
        `,
    );

    for (const box of boxes) {
        const [images] = await db.execute(
            `
            SELECT
                birdbox_images.id,
                birdbox_images.birdbox_id as boxId,
                birdbox_images.file_url AS fileUrl,
                birdbox_images.file_type AS fileType,
                birdbox_images.file_size AS fileSize,
                birdbox_images.captured_at AS capturedAt,
                species.name AS speciesName,
                species_detections.confidence_pct AS confidencePct
            FROM
                birdbox_images
            JOIN
                species_detections
            ON
                birdbox_images.id = species_detections.image_id
            JOIN
                species
            ON
                species_detections.species_id = species.id
            WHERE
                birdbox_images.birdbox_id = ?
            ORDER BY
                birdbox_images.captured_at DESC,
                birdbox_images.id DESC;
            `,
            [box.id],
        );

        box.images = images;

        const [detections] = await db.execute(
            `
            SELECT
                COUNT(species_detections.id) AS totalSightings
            FROM
                species_detections
            WHERE
                birdbox_id = ?;
            `,
            [box.id],
        );

        const [{ totalSightings }] = detections;

        box.totalSightings = totalSightings;
    }

    return boxes.length ? boxes : null;
}

async function getBoxById(id) {
    const [rows] = await db.execute(
        `
        SELECT 
            id, 
            name, 
            trail_name AS trail, 
            latitude AS lat, 
            longitude AS lng, 
            notes 
        FROM 
            birdboxes 
        WHERE 
            id = ?;
        `,
        [id],
    );

    return rows[0] || null;
}

async function createNewBox(data) {
    const { name, trail, lat, lng } = data;

    const params = [name, trail, lat, lng];

    const [result] = await db.execute(
        `
        INSERT INTO birdboxes (
            name, 
            trail_name, 
            latitude, 
            longitude
        ) 
        VALUES (?, ?, ?, ?);
        `,
        params,
    );

    return getBoxById(result.insertId);
}

async function updateBoxById(id, data) {
    const { name, trail, lat, lng, notes } = data;

    const params = [name, trail, lat, lng, , notes, id];

    await db.execute(
        `
        UPDATE 
            birdboxes 
        SET 
            name = ?, 
            trail_name = ?, 
            latitude = ?, 
            longitude = ?, 
            notes = ?, 
            updated_at = NOW() 
        WHERE 
            id = ?;
        `,
        params,
    );

    return getBoxById(id);
}

async function deleteBoxById(id) {
    const [result] = await db.execute(
        `
        DELETE FROM 
            birdboxes 
        WHERE 
            id = ?;
        `,
        [id],
    );

    return result.affectedRows > 0;
}

async function getBoxDetectionsPerWeek(boxId) {
    const [rows] = await db.execute(
        `
        SELECT
            COUNT(species_detections.id) AS detections,
            species.name AS speciesName,
            species_detections.created_at AS createdAt
        FROM
            species_detections
        JOIN
            species ON species_detections.species_id = species.id
        WHERE
            species_detections.birdbox_id = ?
        AND 
            species_detections.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY
            species_detections.created_at, species_detections.species_id
        ORDER BY
            species_detections.created_at ASC;
        `,
        [boxId],
    );

    const lastSevenDays = Array.from({ length: 7 }).map((_, i, arr) => {
        const todaysDate = new Date();

        const dateToFormat = todaysDate.setDate(todaysDate.getDate() - arr.length + i + 1);

        return dateFormatter.formatDateToLocale(dateToFormat, "en-US", true);
    });

    const chartData = lastSevenDays.reduce((acc, date) => {
        acc[date] = { Date: date };

        SPECIES.forEach((name) => (acc[date][name] = 0));

        return acc;
    }, {});

    rows.forEach(({ detections, speciesName, createdAt }) => {
        const formattedDate = dateFormatter.formatDateToLocale(createdAt, "en-US");

        if (chartData[formattedDate]) chartData[formattedDate][speciesName] = detections;
    });

    return chartData ? Object.values(chartData) : null;
}

async function getBoxDetectionsPerMonth(boxId) {
    const [rows] = await db.execute(
        `
        SELECT
            COUNT(species_detections.id) AS detections,
            species.name AS speciesName,
            species_detections.created_at AS createdAt
        FROM
            species_detections
        JOIN
            species ON species_detections.species_id = species.id
        WHERE
            species_detections.birdbox_id = ?
        AND 
            species_detections.created_at >= DATE_FORMAT(NOW(), "%Y-%m-01")
        AND 
            species_detections.created_at <= NOW()
        GROUP BY
            species_detections.created_at, species_detections.species_id
        ORDER BY
            species_detections.created_at ASC;
        `,
        [boxId],
    );

    const currentMonthDays = () => {
        const todaysDateObj = new Date();
        const todaysDateYear = todaysDateObj.getFullYear();
        const todaysDateMonth = todaysDateObj.getMonth();
        const todaysDateDay = todaysDateObj.getDate();

        const monthDates = [];
        for (let i = 1; i <= todaysDateDay; i++) {
            const currentDate = new Date(todaysDateYear, todaysDateMonth, i);
            const currentDateFormatted = dateFormatter.formatDateToLocale(currentDate, "en-US", true);

            monthDates.push(currentDateFormatted);
        }

        return monthDates;
    };

    const chartData = currentMonthDays().reduce((acc, date) => {
        acc[date] = { Date: date };

        SPECIES.forEach((name) => (acc[date][name] = 0));

        return acc;
    }, {});

    rows.forEach(({ detections, speciesName, createdAt }) => {
        const formattedDate = dateFormatter.formatDateToLocale(createdAt, "en-US", true);

        if (chartData[formattedDate]) chartData[formattedDate][speciesName] = detections;
    });

    return chartData ? Object.values(chartData) : null;
}

async function getBoxImagesByBoxId(boxId) {
    const [images] = await db.execute(
        `
        SELECT
            id,
            file_url AS fileUrl,
            file_type AS fileType,
            file_size AS fileSize,
            captured_at AS capturedAt
        FROM
            birdbox_images 
        WHERE
            birdbox_id = ?
        ORDER BY
            captured_at DESC,
            id DESC;
        `,
        [boxId],
    );

    return images.length ? images : null;
}

async function getBoxImageByImageId(boxId, imageId) {
    const [image] = await db.execute(
        `
        SELECT
            id,
            file_url AS fileUrl,
            file_type AS fileType,
            file_size AS fileSize,
            captured_at AS capturedAt
        FROM
            birdbox_images 
        WHERE
            id = ?
        AND 
            birdbox_id = ?
        ORDER BY
            captured_at DESC,
            id DESC;
        `,
        [imageId, boxId],
    );

    return image.length ? image[0] : null;
}

async function deleteBoxImageByImageId(boxId, imageId) {
    const [result] = await db.execute(
        `
        DELETE FROM
            birdbox_images
        WHERE
            id = ?
        AND
            birdbox_id = ?;
        `,
        [imageId, boxId],
    );

    return result.affectedRows > 0;
}

module.exports = {
    // BOXES
    getAllBoxes,
    getBoxById,
    createNewBox,
    updateBoxById,
    deleteBoxById,

    // DETECTIONS
    getBoxDetectionsPerWeek,
    getBoxDetectionsPerMonth,

    // IMAGES
    getBoxImagesByBoxId,
    getBoxImageByImageId,
    deleteBoxImageByImageId,
};
