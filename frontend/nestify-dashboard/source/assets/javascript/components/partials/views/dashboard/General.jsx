// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/dashboard/general.css";
import "../../../../../css/responsive/partials/views/dashboard/general.css";

const INNER_VIEWS = ["Overview", "Analytics", "Gallery", "Maintenance", "Settings"];

const General = function ({ isExportingData, onToggleExportModal, isUploadingData, onToggleUploadModal, selectedInnerView, onToggleInnerView }) {
    return (
        <div className="div-dashboard-view-general-container">
            <header className="header-dashboard-view-general-container">
                <ul className="dashboard-view-general-toggle-list">
                    {INNER_VIEWS.map((innerViewName, i) => {
                        const lowerCasedName = innerViewName.toLowerCase();

                        return (
                            <li key={i} className="dashboard-view-general-toggle-list-item">
                                <button className={`${selectedInnerView === lowerCasedName ? "active" : ""}`} onClick={onToggleInnerView} data-inner-view-name={lowerCasedName}>
                                    <span>{innerViewName}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div className="div-dashboard-view-general-actions-container">
                    <button className={`${isExportingData ? "active" : ""}`} onClick={onToggleExportModal}>
                        <ion-icon src="/media/icons/icon-download.svg" />
                        <span>Export Data</span>
                    </button>
                    <button className={`${isUploadingData ? "active" : ""}`} onClick={onToggleUploadModal}>
                        <ion-icon src="/media/icons/icon-upload.svg" />
                        <span>Upload Data</span>
                    </button>
                </div>
            </header>
        </div>
    );
};

export default General;
