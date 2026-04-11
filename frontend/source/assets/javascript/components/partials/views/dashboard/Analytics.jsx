// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Area, Bar } from "recharts";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/dashboard/analytics.css";
import "../../../../../css/responsive/partials/views/dashboard/analytics.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../../config.js";
import TooltipModal from "../../modals/Tooltip";

const SPECIES = [
    {
        name: "American Kestrel",
        lineType: "monotone",
        color: "#4e801f",
    },
    {
        name: "Brown Bat",
        lineType: "monotone",
        color: "#004c97",
    },
    {
        name: "Other",
        lineType: "monotone",
        color: "#eaaa00",
    },
];

const Analytics = function ({ selectedBirdBox }) {
    const [species, setSpecies] = useState([]);
    const [weeklyChartData, setWeeklyChartData] = useState([]);
    const [monthlyChartData, setMonthlyChartData] = useState([]);

    useEffect(() => {
        (async () => {
            const boxId = selectedBirdBox?.id;

            const [speciesReq, weeklyChartDataReq, monthlyChartDataReq] = await Promise.all([fetch(`${SERVER}/species`), fetch(`${SERVER}/boxes/${boxId}/analytics/week`), fetch(`${SERVER}/boxes/${boxId}/analytics/month`)]);

            const speciesRes = await speciesReq.json();

            // Guard clause.
            if (!speciesRes.success) return;

            const { data: speciesData } = speciesRes;

            setSpecies(speciesData);

            const weeklyChartDataRes = await weeklyChartDataReq.json();

            // Guard clause.
            if (!weeklyChartDataRes.success) return;

            const { data: weeklyData } = weeklyChartDataRes;

            setWeeklyChartData(weeklyData);

            const monthlyChartDataRes = await monthlyChartDataReq.json();

            // Guard clause.
            if (!monthlyChartDataRes.success) return;

            const { data: monthlyData } = monthlyChartDataRes;

            setMonthlyChartData(monthlyData);
        })();
    }, [selectedBirdBox]);

    return (
        <div className="div-dashboard-view-analytics-container">
            <div className="div-dashboard-view-analytics-metrics-container">
                <div className="div-dashboard-view-analytics-trends-container">
                    <h2>Occupancy Trends (Last 7 Days)</h2>
                    <ResponsiveContainer width="100%" height="240">
                        <AreaChart data={weeklyChartData}>
                            <CartesianGrid />
                            <Tooltip content={<TooltipModal />} />
                            {SPECIES.map(({ name, lineType, color }, i) => (
                                <Area key={i} dataKey={name} type={lineType} fill={color} stroke={color} />
                            ))}
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
                    <BarChart data={monthlyChartData}>
                        <CartesianGrid />
                        <Tooltip cursor={{ fill: "#ebebea" }} content={<TooltipModal />} />
                        {SPECIES.map(({ name, color }, i) => (
                            <Bar key={i} dataKey={name} fill={color} />
                        ))}
                        <XAxis dataKey="Date" />
                        <YAxis />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;
