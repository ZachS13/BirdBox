// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Area, Bar } from "recharts";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/dashboard/analytics.css";
import "../../../../../css/responsive/partials/views/dashboard/analytics.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../../config.js";
import TooltipModal from "../../modals/Tooltip";

const Analytics = function () {
    const [species, setSpecies] = useState([]);

    const data = [
        { Date: "Feb 1", "American Kestrel": 12, "Brown Bat": 3, Other: 9 },
        { Date: "Feb 2", "American Kestrel": 10, "Brown Bat": 6, Other: 3 },
        { Date: "Feb 3", "American Kestrel": 3, "Brown Bat": 9, Other: 10 },
        { Date: "Feb 4", "American Kestrel": 6, "Brown Bat": 3, Other: 12 },
        { Date: "Feb 5", "American Kestrel": 9, "Brown Bat": 6, Other: 3 },
        { Date: "Feb 6", "American Kestrel": 3, "Brown Bat": 12, Other: 6 },
        { Date: "Feb 7", "American Kestrel": 9, "Brown Bat": 10, Other: 3 },
    ];

    useEffect(() => {
        (async () => {
            const request = await fetch(`${SERVER}/species`);

            const response = await request.json();

            // Guard clause.
            if (!response.success) return;

            const { data } = response;

            setSpecies(data);
        })();
    }, []);

    return (
        <div className="div-dashboard-view-analytics-container">
            <div className="div-dashboard-view-analytics-metrics-container">
                <div className="div-dashboard-view-analytics-trends-container">
                    <h2>Occupancy Trends (Last 7 Days)</h2>
                    <ResponsiveContainer width="100%" height="240">
                        <AreaChart data={data}>
                            <CartesianGrid />
                            <Tooltip content={<TooltipModal />} />
                            <Area dataKey="American Kestrel" type="monotone" fill="#4e801f" stroke="#4e801f" />
                            <Area dataKey="Brown Bat" type="monotone" fill="#004c97" stroke="#004c97" />
                            <Area dataKey="Other" type="monotone" fill="#eaaa00" stroke="#eaaa00" />
                            <XAxis dataKey="Date" />
                            <YAxis />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="div-dashboard-view-analytics-species-container">
                    <h2>Identified Species</h2>
                    <ul className="dashboard-view-analytics-species-list">
                        {species?.map(({ id, name, isTarget }) => {
                            return (
                                <li key={id} className="dashboard-view-analytics-species-list-item">
                                    <div className="div-dashboard-view-analytics-species-list-item-info-container">
                                        <ion-icon src="/media/icons/icon-dot.svg" />
                                        <span>{name}</span>
                                    </div>
                                    <span className={isTarget ? "target" : "non-target"}>{isTarget ? "Target" : "Non-Target"}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="div-dashboard-view-analytics-pattern-container">
                <header className="header-dashboard-view-analytics-pattern-container">
                    <h2>Monthly Activity Pattern</h2>
                    <p>Activity numbers for each detected species.</p>
                </header>
                <ResponsiveContainer width="100%" height="240">
                    <BarChart data={data}>
                        <CartesianGrid />
                        <Tooltip cursor={{ fill: "#ebebea" }} content={<TooltipModal />} />
                        <Bar dataKey="American Kestrel" fill="#4e801f" />
                        <Bar dataKey="Brown Bat" fill="#004c97" />
                        <Bar dataKey="Other" fill="#eaaa00" />
                        <XAxis dataKey="Date" />
                        <YAxis />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;
