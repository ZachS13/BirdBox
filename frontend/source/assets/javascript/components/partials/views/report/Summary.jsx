// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/report/summary.css";
import "../../../../../css/responsive/partials/views/report/summary.css";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Summary = function ({ selectedDate }) {
    return (
        <div className="div-report-view-summary-container">
            <h2>
                {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()} Summary
            </h2>
            <ul className="report-view-summary-list">
                <li className="report-view-summary-list-item">
                    <p>0</p>
                    <span>Total Sightings</span>
                </li>
                <li className="report-view-summary-list-item">
                    <p>0</p>
                    <span>Target Species</span>
                </li>
                <li className="report-view-summary-list-item">
                    <p>0</p>
                    <span>Non-Target Species</span>
                </li>
            </ul>
        </div>
    );
};

export default Summary;
