// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
// IMPORTED CUSTOM MODULES
import PageLoader from "../partials/loaders/Page";
import ExportModal from "../partials/modals/Export";
import Nav from "../partials/Nav";
import Summary from "../partials/views/report/Summary";
import SpeciesOverview from "../partials/views/report/SpeciesOverview";
import SeasonalHistory from "../partials/views/report/SeasonalHistory";
import NotificationModal from "../partials/modals/Notification";
// IMPORTED STYLESHEETS
import "../../../css/views/report.css";
import "../../../css/responsive/views/report.css";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Report = function () {
    const [isViewLoading, setIsViewLoading] = useState(true);
    const [isExportingData, setIsExportingData] = useState(false);
    const [isSelectingDate, setIsSelectingDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const todaysDate = new Date();

    const handleToggleExportModal = () => setIsExportingData((value) => !value);

    const handleToggleSelectingDate = (e) => {
        setIsSelectingDate((value) => !value);

        const option = e.target.closest("li");

        // Guard clause.
        if (!option) return;

        const { classList } = option;

        // Guard clause.
        if (classList.contains("disabled")) return setIsSelectingDate((value) => !value);

        const { year, month } = option.dataset;

        setTimeout(() => setSelectedDate(new Date(year, month)), 400);

        setIsViewLoading(true);
    };

    useEffect(() => {
        document.title = "Nestify | Report";

        const loadingTimer = setTimeout(() => setIsViewLoading(false), 800);

        return () => clearTimeout(loadingTimer);
    }, []);

    useEffect(() => {
        const loadingTimer = setTimeout(() => setIsViewLoading(false), 800);

        return () => clearTimeout(loadingTimer);
    }, [selectedDate]);

    return (
        <>
            <PageLoader isViewLoading={isViewLoading} />
            {isExportingData && <ExportModal onToggleExportModal={handleToggleExportModal} />}
            <Nav />
            <div className="div-main-edge-container">
                <div className="div-report-view-container">
                    <header className="header-report-view-container">
                        <h2>Conservation Report</h2>
                        <div className="div-header-report-view-actions-container">
                            <div className="div-report-date-select-container">
                                <div className="div-selected-report-date-info-container" onClick={handleToggleSelectingDate}>
                                    <div className="div-selected-report-date-name-container">
                                        <ion-icon src="/media/icons/icon-dot.svg" />
                                        <p>
                                            {MONTHS[selectedDate.getMonth()]}, {selectedDate.getFullYear()}
                                        </p>
                                    </div>
                                    <ion-icon src={`/media/icons/icon-chevron-${isSelectingDate ? "up" : "down"}.svg`} />
                                </div>
                                {isSelectingDate && (
                                    <ul className="report-date-options-list">
                                        {MONTHS.map((month, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className={`report-date-options-list-item${selectedDate.getMonth() === i ? " active" : ""}${todaysDate.getMonth() < i ? " disabled" : ""}`}
                                                    onClick={handleToggleSelectingDate}
                                                    data-year={todaysDate.getFullYear()}
                                                    data-month={i}
                                                >
                                                    <span>
                                                        {month}, {todaysDate.getFullYear()}
                                                    </span>
                                                    <ion-icon src="/media/icons/icon-selected.svg" />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                            <button onClick={handleToggleExportModal}>
                                <ion-icon src="/media/icons/icon-download.svg" />
                                <span>Export Data</span>
                            </button>
                        </div>
                    </header>
                    <Summary selectedDate={selectedDate} />
                    <div className="div-report-view-analytics-container">
                        <SpeciesOverview selectedDate={selectedDate} />
                        <SeasonalHistory selectedDate={selectedDate} />
                    </div>
                </div>
            </div>
            <NotificationModal />
        </>
    );
};

export default Report;
