// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/update-schedule.css";
import "../../../../css/responsive/partials/modals/update-schedule.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../config";
import { formatDateTimeForUser } from "../../../helpers/datetime";
import { capitalize } from "../../../helpers/string";

const MAINTENANCE_STATUS = [
    { id: 1, type: "cancelled" },
    { id: 2, type: "doing" },
    { id: 3, type: "completed" },
];

const UpdateSchedule = function ({ selectedBirdBox, selectedMaintenanceSchedule, onToggleUpdateScheduleModal }) {
    const [inputFocused, setInputFocused] = useState({});
    const [isSelectingMaintenanceStatus, setIsSelectingMaintenanceStatus] = useState(false);
    const [selectedMaintenanceStatus, setSelectedMaintenanceStatus] = useState(() => ({ id: 0, type: "Choose a Status" }));

    const { date, time } = formatDateTimeForUser(selectedMaintenanceSchedule?.deadline);

    const handleSetInputFocused = (e) => setInputFocused((ids) => ({ ...ids, [e.target.getAttribute("id")]: true }));

    const handleIsSelectingMaintenanceStatus = (e) => {
        setIsSelectingMaintenanceStatus((value) => !value);

        const option = e.target.closest("li");

        // Guard clause.
        if (!option) return;

        const dataId = +option.dataset.id;

        // Guard clause.
        if (!dataId) return setSelectedMaintenanceStatus({ id: 0, type: "Choose a Status" });

        const maintenanceStatus = MAINTENANCE_STATUS.find(({ id }) => id === dataId);

        setSelectedMaintenanceStatus({ id: maintenanceStatus.id, type: `${capitalize(maintenanceStatus.type)} Status` });
    };

    const handleUpdateScheduleFormSubmit = async (e) => {
        e.preventDefault();

        const { target } = e;

        const url = target.getAttribute("action");
        const method = target.getAttribute("method");

        const status = selectedMaintenanceStatus.id;

        const body = { status };

        // Guard clause.
        for (const value of Object.values(body)) if (!value) return;

        body.status = MAINTENANCE_STATUS.find((p) => p.id === status).type;

        const request = await fetch(`${SERVER}${url}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const response = await request.json();

        // Guard clause.
        if (!response.success) return;

        // TODO: Update schedules list.

        onToggleUpdateScheduleModal();
    };

    useEffect(() => {
        const { status } = selectedMaintenanceSchedule;

        const maintenanceStatus = MAINTENANCE_STATUS.find(({ type }) => type === status);

        setSelectedMaintenanceStatus({ id: maintenanceStatus.id, type: `${capitalize(maintenanceStatus.type)} Status` });
    }, [selectedMaintenanceSchedule]);

    return (
        <div className="div-update-schedule-modal-container">
            <div className="div-update-schedule-modal">
                <header className="header-update-schedule-modal">
                    <div className="div-header-update-schedule-modal-info-container">
                        <ion-icon src="/media/icons/icon-date.svg" />
                        <h2>Update Schedule Maintenance</h2>
                    </div>
                    <button onClick={onToggleUpdateScheduleModal}>
                        <ion-icon src="/media/icons/icon-close.svg" />
                    </button>
                </header>
                <form className="form-update-schedule-modal" onSubmit={handleUpdateScheduleFormSubmit} action={`/boxes/${selectedBirdBox?.id}/maintenance/schedules/${selectedMaintenanceSchedule?.id}/status`} method="PUT">
                    <div className="div-form-update-schedule-multi-input-container">
                        <div className="div-form-update-schedule-input-container">
                            <label htmlFor="maintenance-date">Date</label>
                            <input id="maintenance-date" type="text" name="maintenance-date" value={date} disabled={true} />
                        </div>
                        <div className="div-form-update-schedule-input-container">
                            <label htmlFor="maintenance-time">Time</label>
                            <input id="maintenance-time" type="text" name="maintenance-time" value={time} disabled={true} />
                        </div>
                    </div>
                    <div className="div-form-update-schedule-input-container">
                        <label htmlFor="maintenance-title">Maintenance Title</label>
                        <input id="maintenance-title" type="text" name="maintenance-title" value={selectedMaintenanceSchedule?.title} disabled={true} />
                    </div>
                    <div className="div-form-update-schedule-input-container">
                        <label htmlFor="assigned-technician">Assigned Technician</label>
                        <input id="assigned-technician" type="text" name="assigned-technician" value={`${selectedMaintenanceSchedule?.username} (${selectedMaintenanceSchedule?.email})`} disabled={true} />
                    </div>
                    <div className="div-form-update-schedule-input-container">
                        <label htmlFor="priority-level">Priority Level</label>
                        <input id="priority-level" type="text" name="priority-level" value={`${capitalize(selectedMaintenanceSchedule?.priority)} Priority`} disabled={true} />
                    </div>
                    <div className="div-form-update-schedule-radio-container">
                        <button className={`${selectedMaintenanceSchedule?.isRecurring !== 0 ? "active" : ""}`} type="button" disabled={true}>
                            <ion-icon src="/media/icons/icon-dot.svg" />
                        </button>
                        <p>It is {selectedMaintenanceSchedule?.isRecurring !== 0 ? "" : "not"} a recurring maintenance.</p>
                    </div>
                    {selectedMaintenanceSchedule?.isRecurring !== 0 && (
                        <div className="div-form-update-schedule-input-container">
                            <label htmlFor="recurring-days">Recurring Every (Days)</label>
                            <input id="recurring-days" type="text" name="recurring-days" value={selectedMaintenanceSchedule?.recurringDays} disabled={true} />
                        </div>
                    )}
                    <div className="div-form-update-schedule-input-container">
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" name="notes" rows="4" value={selectedMaintenanceSchedule?.notes} disabled={true}></textarea>
                    </div>
                    <div className="div-form-add-schedule-input-container">
                        <span>Maintenance Status</span>
                        <div id="maintenance-status" className="div-maintenance-status-select-container" onBlur={handleSetInputFocused} tabIndex={0}>
                            <div className="div-selected-maintenance-status-info-container" onClick={handleIsSelectingMaintenanceStatus}>
                                <p>{selectedMaintenanceStatus.type}</p>
                                <ion-icon src={`/media/icons/icon-chevron-${isSelectingMaintenanceStatus ? "up" : "down"}.svg`} />
                            </div>
                            {isSelectingMaintenanceStatus && (
                                <ul className="maintenance-status-options-list">
                                    <li className={`maintenance-status-options-list-item${!selectedMaintenanceStatus.id ? " active" : ""}`} onClick={handleIsSelectingMaintenanceStatus}>
                                        <span>Choose a Status</span>
                                        <ion-icon src="/media/icons/icon-selected.svg" />
                                    </li>
                                    {MAINTENANCE_STATUS.map(({ id, type }, i) => {
                                        return (
                                            <li key={i} className={`maintenance-status-options-list-item${selectedMaintenanceStatus.id === id ? " active" : ""}`} onClick={handleIsSelectingMaintenanceStatus} data-id={id}>
                                                <span>{capitalize(type)} Status</span>
                                                <ion-icon src="/media/icons/icon-selected.svg" />
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                        <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused["maintenance-status"] && !selectedMaintenanceStatus.id ? "visible" : "hidden"} />
                    </div>
                    <button type="submit">
                        {/* <ion-icon src="/media/icons/icon-selected.svg" /> */}
                        <span>Update Maintenance Status</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateSchedule;
