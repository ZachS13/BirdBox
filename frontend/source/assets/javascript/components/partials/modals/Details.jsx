// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/details.css";
import "../../../../css/responsive/partials/modals/details.css";

const Details = function ({ selectedBirdBox, onToggleDetailsModal }) {
    return (
        <div className="div-details-modal-container">
            <div className="div-details-modal">
                <header className="header-details-modal">
                    <div className="div-header-details-modal-info-container">
                        <ion-icon src="/media/icons/icon-plus.svg" />
                        <h2>
                            BirdBox {selectedBirdBox.id} - {selectedBirdBox.trail}
                        </h2>
                    </div>
                    <button onClick={onToggleDetailsModal}>
                        <ion-icon src="/media/icons/icon-close.svg" />
                    </button>
                </header>
                <div className="div-details-modal-overview-container">
                    <div className="div-details-modal-battery-overview-container">
                        <header className="header-details-modal-battery-overview-container">
                            <div className="div-header-details-modal-battery-overview-info-container">
                                <ion-icon src="/media/icons/icon-battery.svg" />
                                <h4>Battery</h4>
                            </div>
                            <span>80%</span>
                        </header>
                        <div className="div-details-modal-battery-overview-percentage-container">
                            <span>&nbsp;</span>
                        </div>
                    </div>
                    <div className="div-details-modal-analytics-overview-container">
                        <div className="div-details-modal-sightings-overview-container">
                            <p>Total Sightings</p>
                            <span>16</span>
                        </div>
                        <div className="div-details-modal-occupancy-overview-container">
                            <p>Avg. Occupancy</p>
                            <span>6.2 hrs</span>
                        </div>
                    </div>
                    <div className="div-details-modal-images-overview-container">
                        <header className="header-details-modal-images-overview-container">
                            <ion-icon src="/media/icons/icon-camera.svg" />
                            <h4>Recent Images</h4>
                        </header>
                        <ul className="details-modal-images-overview-list">
                            <li className="details-modal-images-overview-list-item">
                                <ion-icon src="/media/icons/icon-camera.svg" />
                            </li>
                            <li className="details-modal-images-overview-list-item">
                                <ion-icon src="/media/icons/icon-camera.svg" />
                            </li>
                            <li className="details-modal-images-overview-list-item">
                                <ion-icon src="/media/icons/icon-camera.svg" />
                            </li>
                        </ul>
                    </div>
                    <a href="#">
                        {/* <ion-icon src="" /> */}
                        <span>View Full Details</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Details;
