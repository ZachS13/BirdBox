// IMPORTED CORE MODULES
import { ResponsiveContainer, AreaChart, BarChart, CartesianGrid, XAxis, YAxis, Area, Bar } from "recharts";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/dashboard/analytics.css";
import "../../../../../css/responsive/partials/views/dashboard/analytics.css";

const Analytics = function () {
    const data = [
        { Day: "Feb 1", Kestrel: 12, Bat: 3, Other: 9 },
        { Day: "Feb 2", Kestrel: 10, Bat: 6, Other: 3 },
        { Day: "Feb 3", Kestrel: 3, Bat: 9, Other: 10 },
        { Day: "Feb 4", Kestrel: 6, Bat: 3, Other: 12 },
        { Day: "Feb 5", Kestrel: 9, Bat: 6, Other: 3 },
        { Day: "Feb 6", Kestrel: 3, Bat: 12, Other: 6 },
        { Day: "Feb 7", Kestrel: 9, Bat: 10, Other: 3 },
    ];

    return (
        <div className="div-dashboard-view-analytics-container">
            <div className="div-dashboard-view-analytics-metrics-container">
                <div className="div-dashboard-view-analytics-trends-container">
                    <h2>Occupancy Trends (Last 7 Days)</h2>
                    <ResponsiveContainer width="100%" height="240">
                        <AreaChart data={data}>
                            <CartesianGrid />
                            <Area dataKey="Kestrel" type="monotone" fill="#4e801f" stroke="#4e801f" />
                            <Area dataKey="Bat" type="monotone" fill="#004c97" stroke="#004c97" />
                            <Area dataKey="Other" type="monotone" fill="#eaaa00" stroke="#eaaa00" />
                            <XAxis dataKey="Day" />
                            <YAxis />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="div-dashboard-view-analytics-species-container">
                    <h2>Identified Species</h2>
                    <ul className="dashboard-view-analytics-species-list">
                        <li className="dashboard-view-analytics-species-list-item">
                            <div className="div-dashboard-view-analytics-species-list-item-info-container">
                                <ion-icon src="/media/icons/icon-dot.svg" />
                                <span>American Kestrel</span>
                            </div>
                            <span>Target</span>
                        </li>
                        <li className="dashboard-view-analytics-species-list-item">
                            <div className="div-dashboard-view-analytics-species-list-item-info-container">
                                <ion-icon src="/media/icons/icon-dot.svg" />
                                <span>Brown Bat</span>
                            </div>
                            <span>Target</span>
                        </li>
                        <li className="dashboard-view-analytics-species-list-item">
                            <div className="div-dashboard-view-analytics-species-list-item-info-container">
                                <ion-icon src="/media/icons/icon-dot.svg" />
                                <span>Other</span>
                            </div>
                            <span>Non-Target</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="div-dashboard-view-analytics-pattern-container">
                <header className="header-dashboard-view-analytics-pattern-container">
                    <h2>Daily Activity Pattern</h2>
                    <p>Peak activity hours for each detected species.</p>
                </header>
                <ResponsiveContainer width="100%" height="240">
                    <BarChart data={data}>
                        <CartesianGrid />
                        <Bar dataKey="Kestrel" fill="#4e801f" />
                        <Bar dataKey="Bat" fill="#004c97" />
                        <Bar dataKey="Other" fill="#eaaa00" />
                        <XAxis dataKey="Day" />
                        <YAxis />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;
