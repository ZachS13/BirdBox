// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../../config.js";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/report/summary.css";
import "../../../../../css/responsive/partials/views/report/summary.css";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Summary = function ({ selectedDate }) {
    const [selectedSummary, setSelectedSummary] = useState({});

    useEffect(() => {
        (async () => {
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1;

            const request = await fetch(`${SERVER}/report/summary?year=${year}&month=${month}`);

            const response = await request.json();

            // Guard clause.
            if (!response.success) return;

            const { data } = response;

            setSelectedSummary(data);
        })();
    }, [selectedDate]);

    return (
        <div className="div-report-view-summary-container">
            <h2>
                {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()} Summary
            </h2>
            <ul className="report-view-summary-list">
                <li className="report-view-summary-list-item">
                    <p>{selectedSummary?.totalSightings}</p>
                    <span>Total Sightings</span>
                </li>
                <li className="report-view-summary-list-item">
                    <p>{selectedSummary?.totalTargetSightings}</p>
                    <span>Target Species</span>
                </li>
                <li className="report-view-summary-list-item">
                    <p>{selectedSummary?.totalNonTargetSightings}</p>
                    <span>Non-Target Species</span>
                </li>
            </ul>
        </div>
    );
};

export default Summary;
