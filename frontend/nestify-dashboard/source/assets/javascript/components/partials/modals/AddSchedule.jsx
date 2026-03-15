// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/add-schedule.css";
import "../../../../css/responsive/partials/modals/add-schedule.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../config";
import { formatDateTimeForDb } from "../../../helpers/datetime";
import { capitalize } from "../../../helpers/string";
import { useAuth } from "../../../context/Auth";

const PRIORITY_LEVELS = [
    { id: 1, type: "low" },
    { id: 2, type: "medium" },
    { id: 3, type: "high" },
];

const PATTERNS = {
    date: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
    time: /^(0[1-9]|1[0-2]):[0-5]\d (AM|PM)$/i,
};

const AddSchedule = function ({ selectedBirdBox, setMaintenanceSchedules, onToggleAddScheduleModal }) {
    const [inputFocused, setInputFocused] = useState({});
    const [maintenanceDate, setMaintenanceDate] = useState("");
    const [isMaintenanceDateFormatValid, setIsMaintenanceDateFormatValid] = useState(false);
    const [maintenanceTime, setMaintenanceTime] = useState("");
    const [isMaintenanceTimeFormatValid, setIsMaintenanceTimeFormatValid] = useState(false);
    const [maintenanceTitle, setMaintenanceTitle] = useState("");
    const [technicians, setTechnicians] = useState([]);
    const [isSelectingAssignedTechnician, setIsSelectingAssignedTechnician] = useState(false);
    const [selectedTechnician, setSelectedTechnician] = useState(() => ({ id: 0, details: "Choose a Technician" }));
    const [isSelectingPriorityLevel, setIsSelectingPriorityLevel] = useState(false);
    const [selectedPriorityLevel, setSelectedPriorityLevel] = useState(() => ({ id: 0, type: "Choose a Priority" }));
    const [isRecurringTask, setIsRecurringTask] = useState(false);
    const [recurringDays, setRecurringDays] = useState(0);
    const { activeUser } = useAuth();

    const handleSetInputFocused = (e) => setInputFocused((ids) => ({ ...ids, [e.target.getAttribute("id")]: true }));

    const handleSetMaintenanceDateTime = (e) => {
        const {
            target,
            target: { value },
        } = e;

        const id = target.getAttribute("id").split("-")[1];

        if (id === "date") setMaintenanceDate(value);
        else setMaintenanceTime(value);

        const pattern = PATTERNS[id];

        if (id === "date") return setIsMaintenanceDateFormatValid(value.match(pattern) !== null);

        setIsMaintenanceTimeFormatValid(value.match(pattern) !== null);
    };

    const handleSetMaintenanceTitle = (e) => setMaintenanceTitle(e.target.value);

    const handleIsSelectingAssignedTechnician = (e) => {
        setIsSelectingAssignedTechnician((value) => !value);

        const option = e.target.closest("li");

        // Guard clause.
        if (!option) return;

        const dataId = +option.dataset.id;

        // Guard clause.
        if (!dataId) return setSelectedTechnician({ id: 0, details: "Choose a Technician" });

        const technician = technicians.find(({ id }) => id === dataId);

        setSelectedTechnician({ id: technician.id, details: `${technician.username} (${technician.email})` });
    };

    const handleIsSelectingPriorityLevel = (e) => {
        setIsSelectingPriorityLevel((value) => !value);

        const option = e.target.closest("li");

        // Guard clause.
        if (!option) return;

        const dataId = +option.dataset.id;

        // Guard clause.
        if (!dataId) return setSelectedPriorityLevel({ id: 0, type: "Choose a Priority" });

        const priorityLevel = PRIORITY_LEVELS.find(({ id }) => id === dataId);

        setSelectedPriorityLevel({ id: priorityLevel.id, type: `${capitalize(priorityLevel.type)} Priority` });
    };

    const handleToggleRecurringTask = () => setIsRecurringTask((value) => !value);

    const handleSetRecurringDays = (e) => setRecurringDays(+e.target.value);

    const handleAddScheduleFormSubmit = async (e) => {
        e.preventDefault();

        const { target } = e;

        const url = target.getAttribute("action");
        const method = target.getAttribute("method");

        const date = target["maintenance-date"].value;
        const time = target["maintenance-time"].value;
        const title = target["maintenance-title"].value;
        const technicianId = selectedTechnician.id;
        const priority = selectedPriorityLevel.id;

        const body = { date, time, title, technicianId, priority };

        // Guard clause.
        for (const value of Object.values(body)) if (!value) return;

        body.priority = PRIORITY_LEVELS.find((p) => p.id === priority).type;
        body.isRecurring = isRecurringTask ? 1 : 0;
        body.recurringDays = isRecurringTask ? +target["recurring-days"].value : 0;
        body.notes = target.notes.value;
        body.createdBy = activeUser.id;
        body.deadline = formatDateTimeForDb(date, time);

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

        const { data } = response;

        setMaintenanceSchedules(({ past, upcoming }) => ({ past, upcoming: Array.isArray(upcoming) ? [...upcoming, data].sort(({ deadline: a }, { deadline: b }) => new Date(a).getTime() - new Date(b).getTime()) : [data] }));

        onToggleAddScheduleModal();
    };

    useEffect(() => {
        (async () => {
            const request = await fetch(`${SERVER}/users`);

            const response = await request.json();

            // Guard clause.
            if (!response.success) return;

            setTechnicians(response.data);
        })();
    }, []);

    return (
        <div className="div-add-schedule-modal-container">
            <div className="div-add-schedule-modal">
                <header className="header-add-schedule-modal">
                    <div className="div-header-add-schedule-modal-info-container">
                        <ion-icon src="/media/icons/icon-date.svg" />
                        <h2>Add Schedule Maintenance</h2>
                    </div>
                    <button onClick={onToggleAddScheduleModal}>
                        <ion-icon src="/media/icons/icon-close.svg" />
                    </button>
                </header>
                <form className="form-add-schedule-modal" onSubmit={handleAddScheduleFormSubmit} action={`/boxes/${selectedBirdBox?.id}/maintenance/schedules`} method="POST">
                    <div className="div-form-add-schedule-multi-input-container">
                        <div className="div-form-add-schedule-input-container">
                            <label htmlFor="maintenance-date">Date</label>
                            <input id="maintenance-date" type="text" name="maintenance-date" onChange={handleSetMaintenanceDateTime} onBlur={handleSetInputFocused} placeholder="mm/dd/yyyy" />
                            <span className={inputFocused["maintenance-date"] && !isMaintenanceDateFormatValid ? "visible" : "hidden"}>Format (mm/dd/yyy) is required.</span>
                            <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused["maintenance-date"] && !maintenanceDate ? "visible" : "hidden"} />
                        </div>
                        <div className="div-form-add-schedule-input-container">
                            <label htmlFor="maintenance-time">Time</label>
                            <input id="maintenance-time" type="text" name="maintenance-time" onChange={handleSetMaintenanceDateTime} onBlur={handleSetInputFocused} placeholder="--:-- --" />
                            <span className={inputFocused["maintenance-time"] && !isMaintenanceTimeFormatValid ? "visible" : "hidden"}>Format (--:-- --) is required.</span>
                            <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused["maintenance-time"] && !maintenanceTime ? "visible" : "hidden"} />
                        </div>
                    </div>
                    <div className="div-form-add-schedule-input-container">
                        <label htmlFor="maintenance-title">Maintenance Title</label>
                        <input id="maintenance-title" type="text" name="maintenance-title" onChange={handleSetMaintenanceTitle} onBlur={handleSetInputFocused} placeholder="Battery Replacement" />
                        <span className={inputFocused["maintenance-title"] && !maintenanceTitle.length ? "visible" : "hidden"}>Maintenance title is required.</span>
                    </div>
                    <div className="div-form-add-schedule-input-container">
                        <span>Assigned Technician</span>
                        <div id="assigned-technician" className="div-assigned-technician-select-container" onBlur={handleSetInputFocused} tabIndex={0}>
                            <div className="div-selected-assigned-technician-info-container" onClick={handleIsSelectingAssignedTechnician}>
                                <p>{selectedTechnician.details}</p>
                                <ion-icon src={`/media/icons/icon-chevron-${isSelectingAssignedTechnician ? "up" : "down"}.svg`} />
                            </div>
                            {isSelectingAssignedTechnician && (
                                <ul className="assigned-technician-options-list">
                                    <li className={`assigned-technician-options-list-item${!selectedTechnician.id ? " active" : ""}`} onClick={handleIsSelectingAssignedTechnician}>
                                        <span>Choose a Technician</span>
                                        <ion-icon src="/media/icons/icon-selected.svg" />
                                    </li>
                                    {technicians.map(({ id, username, email }, i) => {
                                        return (
                                            <li key={i} className={`assigned-technician-options-list-item${selectedTechnician.id === id ? " active" : ""}`} onClick={handleIsSelectingAssignedTechnician} data-id={id}>
                                                <span>
                                                    {username} - ({email})
                                                </span>
                                                <ion-icon src="/media/icons/icon-selected.svg" />
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                        <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused["assigned-technician"] && !selectedTechnician.id ? "visible" : "hidden"} />
                    </div>
                    <div className="div-form-add-schedule-input-container">
                        <span>Priority Level</span>
                        <div id="priority-level" className="div-priority-level-select-container" onBlur={handleSetInputFocused} tabIndex={0}>
                            <div className="div-selected-priority-level-info-container" onClick={handleIsSelectingPriorityLevel}>
                                <p>{selectedPriorityLevel.type}</p>
                                <ion-icon src={`/media/icons/icon-chevron-${isSelectingPriorityLevel ? "up" : "down"}.svg`} />
                            </div>
                            {isSelectingPriorityLevel && (
                                <ul className="priority-level-options-list">
                                    <li className={`priority-level-options-list-item${!selectedPriorityLevel.id ? " active" : ""}`} onClick={handleIsSelectingPriorityLevel}>
                                        <span>Choose a Priority</span>
                                        <ion-icon src="/media/icons/icon-selected.svg" />
                                    </li>
                                    {PRIORITY_LEVELS.map(({ id, type }, i) => {
                                        return (
                                            <li key={i} className={`priority-level-options-list-item${selectedPriorityLevel.id === id ? " active" : ""}`} onClick={handleIsSelectingPriorityLevel} data-id={id}>
                                                <span>{capitalize(type)} Priority</span>
                                                <ion-icon src="/media/icons/icon-selected.svg" />
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                        <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused["priority-level"] && !selectedPriorityLevel.id ? "visible" : "hidden"} />
                    </div>
                    <div className="div-form-add-schedule-radio-container">
                        <button className={`${isRecurringTask ? "active" : ""}`} onClick={handleToggleRecurringTask} type="button">
                            <ion-icon src="/media/icons/icon-dot.svg" />
                        </button>
                        <p>Set as recurring maintenance?</p>
                    </div>
                    {isRecurringTask && (
                        <div className="div-form-add-schedule-input-container">
                            <label htmlFor="recurring-days">Recurring Every (Days)</label>
                            <input id="recurring-days" type="text" name="recurring-days" onChange={handleSetRecurringDays} onBlur={handleSetInputFocused} placeholder="30" />
                            <span className={isRecurringTask && inputFocused["recurring-days"] && !recurringDays ? "visible" : "hidden"}>Recurring days must be set.</span>
                        </div>
                    )}
                    <div className="div-form-add-schedule-input-container">
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" name="notes" rows="4" placeholder="Additional notes..."></textarea>
                    </div>
                    <button type="submit">
                        {/* <ion-icon src="/media/icons/icon-selected.svg" /> */}
                        <span>Confirm Maintenance</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSchedule;
