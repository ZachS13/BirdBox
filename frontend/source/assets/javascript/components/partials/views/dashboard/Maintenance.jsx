import { useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/dashboard/maintenance.css";
import "../../../../../css/responsive/partials/views/dashboard/maintenance.css";
// IMPORTED MODULES
import { SERVER } from "../../../../../../config.js";
import { formatDateTimeForUser } from "../../../../helpers/datetime.js";
import { capitalize } from "../../../../helpers/string.js";
import AddScheduleModal from "../../modals/AddSchedule";
import UpdateScheduleModal from "../../modals/UpdateSchedule";

const Maintenance = function ({ selectedBirdBox }) {
    const [isViewingAddSchedule, setIsViewingAddSchedule] = useState(false);
    const [isViewingUpdateSchedule, setIsViewingUpdateSchedule] = useState(false);
    const [maintenanceSchedules, setMaintenanceSchedules] = useState();
    const [selectedMaintenanceSchedule, setSelectedMaintenanceSchedule] = useState({});

    const handleToggleAddScheduleModal = () => setIsViewingAddSchedule((value) => !value);

    const handleToggleUpdateScheduleModal = (e) => {
        setIsViewingUpdateSchedule((value) => !value);

        const option = e?.target.closest("li");

        // Guard clause.
        if (!option) return setSelectedMaintenanceSchedule({});

        const { id: dataId, timeline } = option.dataset;

        setSelectedMaintenanceSchedule(maintenanceSchedules[timeline].find(({ id }) => id === +dataId));
    };

    useEffect(() => {
        (async () => {
            const request = await fetch(`${SERVER}/boxes/${selectedBirdBox?.id}/maintenance/schedules`);

            const response = await request.json();

            // Guard clause.
            if (!response.success) return;

            setMaintenanceSchedules(response.data);
        })();
    }, [selectedBirdBox, selectedMaintenanceSchedule]);

    return (
        <>
            {isViewingAddSchedule && <AddScheduleModal selectedBirdBox={selectedBirdBox} setMaintenanceSchedules={setMaintenanceSchedules} onToggleAddScheduleModal={handleToggleAddScheduleModal} />}
            {isViewingUpdateSchedule && <UpdateScheduleModal selectedBirdBox={selectedBirdBox} selectedMaintenanceSchedule={selectedMaintenanceSchedule} onToggleUpdateScheduleModal={handleToggleUpdateScheduleModal} />}
            <div className="div-dashboard-view-maintenance-container">
                <div className="div-dashboard-view-maintenance-log-container">
                    <h2>Maintenance Log</h2>
                    {maintenanceSchedules?.past?.length ? (
                        <>
                            <ul className="dashboard-view-maintenance-log-list">
                                {maintenanceSchedules.past.map(({ id, title, priority, status, updatedAt, username, email }, i) => {
                                    const { date, time } = formatDateTimeForUser(updatedAt);

                                    return (
                                        <li
                                            key={i}
                                            className={`dashboard-view-maintenance-log-list-item${selectedMaintenanceSchedule?.id === id ? " active" : ""}`}
                                            onClick={handleToggleUpdateScheduleModal}
                                            data-id={id}
                                            data-timeline="past"
                                        >
                                            <header className="header-dashboard-view-maintenance-log-list-item">
                                                <div className="div-header-dashboard-view-maintenance-log-list-item-info-container">
                                                    <p>{title}</p>
                                                    <span>
                                                        {capitalize(status)} On: {date} @ {time}
                                                    </span>
                                                </div>
                                                <span>
                                                    {username} ({email})
                                                </span>
                                            </header>
                                            <div className="div-dashboard-view-maintenance-log-list-item-indicators-container">
                                                <ion-icon key={status} src={`/media/icons/icon-${status === "doing" ? "time" : status === "completed" ? "check" : "bad"}.svg`} className={status} />
                                                <span className={status}>{capitalize(status)}</span>
                                                <span className={priority}>{capitalize(priority)}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            {maintenanceSchedules.past.length > 3 && (
                                <button>
                                    <ion-icon src="/media/icons/icon-file.svg" />
                                    <span>View Full Log</span>
                                </button>
                            )}
                        </>
                    ) : (
                        <p>There are no past logs available to display at the moment.</p>
                    )}
                </div>
                <div className="div-dashboard-view-maintenance-schedule-container">
                    <h2>Maintenance Schedule</h2>
                    {maintenanceSchedules?.upcoming?.length ? (
                        <ul className="dashboard-view-maintenance-schedule-list">
                            {maintenanceSchedules.upcoming.map(({ id, title, priority, status, deadline }, i) => {
                                const { date, time } = formatDateTimeForUser(deadline);

                                return (
                                    <li
                                        key={i}
                                        className={`dashboard-view-maintenance-schedule-list-item${selectedMaintenanceSchedule?.id === id ? " active" : ""}`}
                                        onClick={handleToggleUpdateScheduleModal}
                                        data-id={id}
                                        data-timeline="upcoming"
                                    >
                                        <header className="header-dashboard-view-maintenance-schedule-list-item">
                                            <p>{title}</p>
                                            <span>
                                                Expected By: {date} @ {time}
                                            </span>
                                        </header>
                                        <div className="div-dashboard-view-maintenance-schedule-list-item-indicators-container">
                                            <ion-icon key={status} src={`/media/icons/icon-${status === "doing" ? "time" : status === "completed" ? "check" : "bad"}.svg`} className={status} />
                                            <span className={status}>{capitalize(status)}</span>
                                            <span className={priority}>{capitalize(priority)}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No upcoming scheduled tasks. Start by creating your first task.</p>
                    )}
                    <button onClick={handleToggleAddScheduleModal}>
                        <ion-icon src="/media/icons/icon-settings.svg" />
                        <span>Schedule Maintenance</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Maintenance;
