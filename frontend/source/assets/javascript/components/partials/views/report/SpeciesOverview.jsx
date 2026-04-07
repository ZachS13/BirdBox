// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/report/species-overview.css";
import "../../../../../css/responsive/partials/views/report/species-overview.css";

const SpeciesOverview = function () {
    return (
        <div className="div-report-view-species-overview-container">
            <div className="div-report-view-specie-overview-container">
                <header className="header-report-view-specie-overview-container">
                    <ion-icon src="/media/icons/icon-check.svg" />
                    <h4>Target Species</h4>
                </header>
                <ul className="report-view-specie-overview-list">
                    <li className="report-view-specie-overview-list-item">
                        <p>American Kestrel:</p>
                        <span>0 obs</span>
                    </li>
                    <li className="report-view-specie-overview-list-item">
                        <p>Brown Bat:</p>
                        <span>0 obs</span>
                    </li>
                </ul>
            </div>
            <div className="div-report-view-specie-overview-container">
                <header className="header-report-view-specie-overview-container">
                    <ion-icon src="/media/icons/icon-warning.svg" />
                    <h4>Non-Target Species</h4>
                </header>
                <ul className="report-view-specie-overview-list">
                    <li className="report-view-specie-overview-list-item">
                        <p>Other:</p>
                        <span>0 obs</span>
                    </li>
                </ul>
            </div>
            <div className="div-report-view-specie-overview-container">
                <header className="header-report-view-specie-overview-container">
                    <ion-icon src="/media/icons/icon-bird.svg" />
                    <h4>American Kestrel Analysis</h4>
                </header>
                <ul className="report-view-specie-overview-list">
                    <li className="report-view-specie-overview-list-item">
                        <p>Observations:</p>
                        <span>0</span>
                    </li>
                    <li className="report-view-specie-overview-list-item">
                        <p>Last Seen:</p>
                        <span>Today</span>
                    </li>
                    {/* <li className="report-view-specie-overview-list-item">
                        <p>Active Nesting Sights:</p>
                        <span>0</span>
                    </li> */}
                    {/* <li className="report-view-specie-overview-list-item">
                        <p>Average Occupancy:</p>
                        <span>0 hrs</span>
                    </li> */}
                    {/* <li className="report-view-specie-overview-list-item">
                        <p>Peak Time:</p>
                        <span>8:00 AM</span>
                    </li> */}
                </ul>
            </div>
            <div className="div-report-view-specie-overview-container">
                <header className="header-report-view-specie-overview-container">
                    <ion-icon src="/media/icons/icon-bat.svg" />
                    <h4>Brown Bat Analysis</h4>
                </header>
                <ul className="report-view-specie-overview-list">
                    <li className="report-view-specie-overview-list-item">
                        <p>Observations:</p>
                        <span>0</span>
                    </li>
                    <li className="report-view-specie-overview-list-item">
                        <p>Last Seen:</p>
                        <span>Today</span>
                    </li>
                    {/* <li className="report-view-specie-overview-list-item">
                        <p>Active Nesting Sights:</p>
                        <span>0</span>
                    </li> */}
                    {/* <li className="report-view-specie-overview-list-item">
                        <p>Average Occupancy:</p>
                        <span>0 hrs</span>
                    </li> */}
                    {/* <li className="report-view-specie-overview-list-item">
                        <p>Peak Time:</p>
                        <span>8:00 AM</span>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default SpeciesOverview;
