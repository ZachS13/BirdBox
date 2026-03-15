// IMPORTED CORE MODULES
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/report/seasonal-history.css";

const SeasonalHistory = function () {
    const data = [
        { Name: "Mar", Kestrel: 86, Bat: 2, Total: 88 },
        { Name: "Apr", Kestrel: 2, Bat: 14, Total: 16 },
        { Name: "May", Kestrel: 45, Bat: 16, Total: 61 },
        { Name: "Jun", Kestrel: 23, Bat: 2, Total: 25 },
        { Name: "Jul", Kestrel: 67, Bat: 1, Total: 68 },
        { Name: "Aug", Kestrel: 12, Bat: 0, Total: 12 },
        { Name: "Sep", Kestrel: 56, Bat: 19, Total: 75 },
        { Name: "Oct", Kestrel: 95, Bat: 23, Total: 118 },
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
                        <span>Total</span>
                    </li>
                </ul>
                <ResponsiveContainer width="100%" height="480">
                    <LineChart data={data}>
                        <CartesianGrid />
                        <Line dataKey="Kestrel" type="monotone" stroke="#006938" />
                        <Line dataKey="Bat" type="monotone" stroke="#004C97" />
                        <Line dataKey="Total" type="monotone" stroke="#8246AF" />
                        <XAxis dataKey="Name" />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SeasonalHistory;
