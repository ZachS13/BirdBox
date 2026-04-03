// IMPORTED CORE MODULES
import { Link } from "react-router-dom";
// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/details.css";
import "../../../../css/responsive/partials/modals/details.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../config.js";

const Details = function ({ selectedBirdBox, onToggleDetailsModal }) {
    const recentImages = selectedBirdBox.images.filter((_, i) => i <= 5);

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
                            <span>{selectedBirdBox.battery}%</span>
                        </header>
                        <div className="div-details-modal-battery-overview-percentage-container">
                            <div className="div-details-modal-battery-overview-percentage" style={{ width: `${selectedBirdBox.battery}%` }}>
                                &nbsp;
                            </div>
                        </div>
                    </div>
                    <div className="div-details-modal-analytics-overview-container">
                        <div className="div-details-modal-sightings-overview-container">
                            <p>Total Sightings</p>
                            <span>{selectedBirdBox.totalSightings}</span>
                        </div>
                        <div className="div-details-modal-occupancy-overview-container">
                            <p>Avg. Occupancy</p>
                            <span>0 hrs</span>
                        </div>
                    </div>
                    <div className="div-details-modal-images-overview-container">
                        <header className="header-details-modal-images-overview-container">
                            <ion-icon src="/media/icons/icon-camera.svg" />
                            <h4>Recent Images</h4>
                        </header>
                        {selectedBirdBox.images.length ? (
                            <ul className="details-modal-images-overview-list">
                                {Array.from({ length: 3 }).map((_, i) => {
                                    if (recentImages[i]) {
                                        return (
                                            <li key={i} className="details-modal-images-overview-list-item">
                                                <img src={`${SERVER}${recentImages[i].fileUrl}`} alt="Alt Text Goes Here" />
                                            </li>
                                        );
                                    }

                                    return (
                                        <li key={i} className="details-modal-images-overview-list-item">
                                            <ion-icon src="/media/icons/icon-camera.svg" />
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p>There are currently no images available to display.</p>
                        )}
                    </div>
                    <Link to={`/dashboard/${selectedBirdBox.id}`}>
                        <ion-icon src="/media/icons/icon-bird-house.svg" />
                        <span>View Full Details</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Details;
