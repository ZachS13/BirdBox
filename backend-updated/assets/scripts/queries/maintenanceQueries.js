const db = require("../../sql/database.js");

async function getAllMaintenanceSchedulesByBoxId(boxId, timeline) {
    let query = `
        SELECT 
            maintenance_schedules.id, 
            maintenance_schedules.user_id AS userId, 
            maintenance_schedules.birdbox_id AS boxId, 
            maintenance_schedules.title, 
            maintenance_schedules.priority, 
            maintenance_schedules.is_recurring AS isRecurring, 
            maintenance_schedules.recurring_days AS recurringDays, 
            maintenance_schedules.notes, 
            maintenance_schedules.status, 
            maintenance_schedules.created_by AS createdBy, 
            maintenance_schedules.deadline, 
            maintenance_schedules.updated_at AS updatedAt, 
            users.email, 
            users.username 
        FROM 
            maintenance_schedules 
        JOIN 
            users 
        ON 
            maintenance_schedules.user_id = users.id 
        WHERE 
            birdbox_id = ? 
    `;

    if (timeline === "past")
        query += `
            AND 
                deadline < NOW() 
            OR 
                status != "doing" 
        `;
    else if (timeline === "upcoming")
        query += `
            AND 
                deadline > NOW() 
            AND 
                status = "doing" 
        `;

    query += `
        ORDER BY 
            deadline ASC;
    `;

    const [rows] = await db.execute(query, [boxId]);

    return rows.length ? rows : null;
}

async function getMaintenanceScheduleById(id, boxId) {
    const [rows] = await db.execute(
        `
        SELECT 
            maintenance_schedules.id, 
            maintenance_schedules.user_id AS userId, 
            maintenance_schedules.birdbox_id AS boxId, 
            maintenance_schedules.title, 
            maintenance_schedules.priority, 
            maintenance_schedules.is_recurring AS isRecurring, 
            maintenance_schedules.recurring_days AS recurringDays, 
            maintenance_schedules.notes, 
            maintenance_schedules.status, 
            maintenance_schedules.created_by AS createdBy, 
            maintenance_schedules.deadline, 
            users.email, 
            users.username 
        FROM 
            maintenance_schedules 
        JOIN 
            users 
        ON 
            maintenance_schedules.user_id = users.id 
        WHERE 
            maintenance_schedules.id = ? 
        AND 
            birdbox_id = ?;
        `,
        [id, boxId],
    );

    return rows[0] || null;
}

async function createNewMaintenanceSchedule(boxId, data) {
    const { technicianId, title, priority, isRecurring, recurringDays, notes, createdBy, deadline } = data;

    const params = [technicianId, boxId, title, priority, isRecurring, recurringDays, notes, createdBy, deadline];

    const [rows] = await db.execute(
        `
        INSERT INTO maintenance_schedules (
            user_id, 
            birdbox_id, 
            title, 
            priority, 
            is_recurring, 
            recurring_days, 
            notes, 
            created_by, 
            deadline
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        params,
    );

    return await getMaintenanceScheduleById(rows.insertId, boxId);
}

async function updateMaintenanceScheduleStatus(id, boxId, body) {
    const { status } = body;

    const [result] = await db.execute(
        `
        UPDATE 
            maintenance_schedules 
        SET 
            status = ? 
        WHERE 
            id = ? 
        AND 
            birdbox_id = ?;
        `,
        [status, id, boxId],
    );

    if (result.affectedRows === 0) return false;

    return await getMaintenanceScheduleById(id, boxId);
}

async function deleteMaintenanceScheduleById(id, boxId) {
    const [rows] = await db.execute(
        `
        DELETE FROM 
            maintenance_schedules 
        WHERE 
            id = ? 
        AND 
            birdbox_id = ?;
        `,
        [id, boxId],
    );

    return rows.affectedRows > 0;
}

module.exports = {
    getAllMaintenanceSchedulesByBoxId,
    getMaintenanceScheduleById,
    createNewMaintenanceSchedule,
    updateMaintenanceScheduleStatus,
    deleteMaintenanceScheduleById,
};
