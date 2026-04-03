// IMPORTED CORE MODULES
import { ResponsiveContainer, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Line } from "recharts";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/report/seasonal-history.css";
// IMPORTED CUSTOM MODULES
import TooltipModal from "../../modals/Tooltip";

const SeasonalHistory = function () {
    const data = [
        { Month: "Mar", "American Kestrel": 86, "Brown Bat": 2, Other: 4, Total: 92 },
        { Month: "Apr", "American Kestrel": 2, "Brown Bat": 14, Other: 7, Total: 20 },
        { Month: "May", "American Kestrel": 45, "Brown Bat": 16, Other: 1, Total: 65 },
        { Month: "Jun", "American Kestrel": 23, "Brown Bat": 2, Other: 12, Total: 29 },
        { Month: "Jul", "American Kestrel": 67, "Brown Bat": 1, Other: 45, Total: 72 },
        { Month: "Aug", "American Kestrel": 12, "Brown Bat": 0, Other: 25, Total: 16 },
        { Month: "Sep", "American Kestrel": 56, "Brown Bat": 19, Other: 10, Total: 79 },
        { Month: "Oct", "American Kestrel": 95, "Brown Bat": 23, Other: 17, Total: 122 },
    ];

    return (
        <div className="div-report-view-seasonal-history-container">
            <h4>Seasonal History Patterns</h4>
            <div className="div-report-view-seasonal-history-chart-overview-container">
                <ul className="report-view-seasonal-history-chart-legend-list">
                    <li className="report-view-seasonal-history-chart-legend-list-item">
                        <ion-icon src="/media/icons/icon-dot.svg" />
                        <span>American Kestrel</span>
                    </li>
                    <li className="report-view-seasonal-history-chart-legend-list-item">
                        <ion-icon src="/media/icons/icon-dot.svg" />
                        <span>Brown Bat</span>
                    </li>
                    <li className="report-view-seasonal-history-chart-legend-list-item">
                        <ion-icon src="/media/icons/icon-dot.svg" />
                        <span>Other</span>
                    </li>
                    <li className="report-view-seasonal-history-chart-legend-list-item">
                        <ion-icon src="/media/icons/icon-dot.svg" />
                        <span>Total</span>
                    </li>
                </ul>
                <ResponsiveContainer width="100%" height="480">
                    <LineChart data={data}>
                        <CartesianGrid />
                        <Tooltip content={<TooltipModal />} />
                        <Line dataKey="American Kestrel" type="monotone" stroke="#006938" />
                        <Line dataKey="Brown Bat" type="monotone" stroke="#004C97" />
                        <Line dataKey="Other" type="monotone" stroke="#eaaa00" />
                        <Line dataKey="Total" type="monotone" stroke="#8246AF" />
                        <XAxis dataKey="Month" />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SeasonalHistory;
