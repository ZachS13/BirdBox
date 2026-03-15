// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/report/summary.css";
import "../../../../../css/responsive/partials/views/report/summary.css";

const Summary = function () {
    return (
        <div className="div-report-view-summary-container">
            <h2>January 2026 Summary</h2>
            <ul className="report-view-summary-list">
                <li className="report-view-summary-list-item">
                    <p>38</p>
                    <span>Total Sightings</span>
                </li>
                <li className="report-view-summary-list-item">
                    <p>32</p>
                    <span>Total Species</span>
                </li>
                <li className="report-view-summary-list-item">
                    <p>2</p>
                    <span>Non-Target Species</span>
                </li>
            </ul>
        </div>
    );
};

export default Summary;
