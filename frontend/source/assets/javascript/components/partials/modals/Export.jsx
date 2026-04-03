// IMPORTED CORE MODULES
import { useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/export.css";
// import "../../../../css/responsive/partials/modals/export.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../config.js";

const Export = function ({ onToggleExportModal }) {
    const [selectedExportType, setSelectingExportType] = useState("csv");

    const handleSetSelectedExportType = (e) => setSelectingExportType(e.target.dataset.fileType);

    return (
        <div className="div-export-modal-container">
            <div className="div-export-modal">
                <header className="header-export-modal">
                    <div className="div-header-export-modal-info-container">
                        <ion-icon src="/media/icons/icon-download.svg" />
                        <h2>Export Data</h2>
                    </div>
                    <button onClick={onToggleExportModal}>
                        <ion-icon src="/media/icons/icon-close.svg" />
                    </button>
                </header>
                <form className="form-export-modal" action="" method="">
                    <div className="div-form-export-content-container">
                        <p>Choose a file type to download:</p>
                        <div className="div-form-export-multi-input-container">
                            <div className="div-form-export-input-container">
                                <button className={selectedExportType === "pdf" ? "active" : ""} type="button" onClick={handleSetSelectedExportType} data-export-type="pdf">
                                    <ion-icon src="/media/icons/icon-file.svg" />
                                    <span>PDF</span>
                                </button>
                            </div>
                            <div className="div-form-export-input-container">
                                <button className={selectedExportType === "csv" ? "active" : ""} type="button" onClick={handleSetSelectedExportType} data-export-type="csv">
                                    <ion-icon src="/media/icons/icon-table.svg" />
                                    <span>CSV</span>
                                </button>
                            </div>
                        </div>
                        <input id="export-type" type="hidden" value={selectedExportType} />
                    </div>
                    <button type="submit">
                        <ion-icon src="/media/icons/icon-download.svg" />
                        <span>Download File</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Export;
