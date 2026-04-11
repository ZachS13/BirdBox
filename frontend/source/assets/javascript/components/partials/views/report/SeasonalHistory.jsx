// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Line } from "recharts";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../../config.js";
import TooltipModal from "../../modals/Tooltip";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/report/seasonal-history.css";

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
    {
        name: "Total",
        lineType: "monotone",
        color: "#8246AF",
    },
];

const SeasonalHistory = function ({ selectedDate }) {
    const [selectedSeasonalHistory, setSelectedSeasonalHistory] = useState([]);

    useEffect(() => {
        (async () => {
            const month = selectedDate.getMonth() + 1;

            const request = await fetch(`${SERVER}/report/history?month=${month}`);

            const response = await request.json();

            // Guard clause.
            if (!response.success) return;

            const { data } = response;

            setSelectedSeasonalHistory(data);
        })();
    }, [selectedDate]);

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
                    <LineChart data={selectedSeasonalHistory}>
                        <CartesianGrid />
                        <Tooltip content={<TooltipModal />} />
                        {SPECIES.map(({ name, lineType, color }) => (
                            <Line dataKey={name} type={lineType} stroke={color} />
                        ))}
                        <XAxis dataKey="Month" />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SeasonalHistory;
