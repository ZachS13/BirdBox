import { useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../css/views/report.css";
import "../../../css/responsive/views/report.css";
// IMPORTED MODULES
import PageLoader from "../partials/loaders/Page";
import ExportModal from "../partials/modals/Export";
import Nav from "../partials/Nav";
import Summary from "../partials/views/report/Summary";
import SpeciesOverview from "../partials/views/report/SpeciesOverview";
import SeasonalHistory from "../partials/views/report/SeasonalHistory";
import NotificationModal from "../partials/modals/Notification";

const Report = function () {
    const [isViewLoading, setIsViewLoading] = useState(true);
    const [isExportingData, setIsExportingData] = useState(false);

    const handleToggleExportModal = () => setIsExportingData((value) => !value);

    useEffect(function () {
        document.title = "Nestify | Report";

        const loadingTimer = setTimeout(() => setIsViewLoading(false), 800);

        return () => clearTimeout(loadingTimer);
    }, []);

    return (
        <>
            <PageLoader isViewLoading={isViewLoading} />
            {isExportingData && <ExportModal onToggleExportModal={handleToggleExportModal} />}
            <Nav />
            <div className="div-main-edge-container">
                <div className="div-report-view-container">
                    <header className="header-report-view-container">
                        <h2>Conservation Report</h2>
                        <button onClick={handleToggleExportModal}>
                            <ion-icon src="/media/icons/icon-file.svg" />
                            <span>Generate Report</span>
                        </button>
                    </header>
                    <Summary />
                    <div className="div-report-view-analytics-container">
                        <SpeciesOverview />
                        <SeasonalHistory />
                    </div>
                </div>
            </div>
            <NotificationModal />
        </>
    );
};

export default Report;
