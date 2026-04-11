// IMPORTED CORE MODULES
import { Activity, useState } from "react";
import { Link } from "react-router-dom";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/dashboard/overview.css";
import "../../../../../css/responsive/partials/views/dashboard/overview.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../../config.js";
import { calculateTimeAgo } from "../../../../helpers/datetime.js";
import ImageModal from "../../modals/Image";

const Overview = function ({ selectedBirdBox, onToggleInnerView }) {
    const [isViewingImage, setIsViewingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const lastActive = calculateTimeAgo(selectedBirdBox?.images[0].capturedAt);
    const recentImages = selectedBirdBox?.images.filter((_, i) => i <= 5);

    const handleToggleImageModal = (e) => {
        const { target } = e;

        setIsViewingImage((value) => !value);

        const { localName } = target;

        // Guard clause.
        if (localName !== "img") return;

        const { json } = target.dataset;

        const image = JSON.parse(json);

        setSelectedImage(image);
    };

    return (
        <>
            {isViewingImage && <ImageModal selectedImage={selectedImage} onToggleImageModal={handleToggleImageModal} />}
            <div className="div-dashboard-view-overview-container">
                <div className="div-dashboard-view-overview-statistics-container">
                    <div className="div-dashboard-view-overview-statistics-overview-container">
                        <header className="header-dashboard-view-overview-statistics-overview-container">
                            <ion-icon src="/media/icons/icon-chart.svg" />
                            <h4>Statistics</h4>
                        </header>
                        <ul className="dashboard-view-overview-statistics-overview-list">
                            <li className="dashboard-view-overview-statistics-overview-list-item">
                                <p>Total Sightings:</p>
                                <span>{selectedBirdBox?.totalSightings}</span>
                            </li>
                            <li className="dashboard-view-overview-statistics-overview-list-item">
                                <p>Last Active:</p>
                                <span>{lastActive}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="div-dashboard-view-overview-location-overview-container">
                        <header className="header-dashboard-view-overview-location-overview-container">
                            <ion-icon src="/media/icons/icon-location.svg" />
                            <h4>Location</h4>
                        </header>
                        <ul className="dashboard-view-overview-location-overview-list">
                            <li className="dashboard-view-overview-location-overview-list-item">
                                <p>{selectedBirdBox?.trail}</p>
                            </li>
                            <li className="dashboard-view-overview-location-overview-list-item">
                                <p>
                                    {selectedBirdBox?.lat}, {selectedBirdBox?.lng}
                                </p>
                            </li>
                        </ul>
                        <Link to="/map">
                            <ion-icon src="/media/icons/icon-location.svg" />
                            <span>View on Map</span>
                        </Link>
                    </div>
                    {/* <div className="div-dashboard-view-overview-battery-overview-container">
                        <header className="header-dashboard-view-overview-battery-overview-container">
                            <ion-icon src="/media/icons/icon-battery.svg" />
                            <h4>Battery</h4>
                        </header>
                        <div className="div-dashboard-view-overview-battery-overview-info-container">
                            <span>{selectedBirdBox?.battery}%</span>
                            <div className="div-dashboard-view-overview-battery-overview-percentage-container">
                                <div className="div-dashboard-view-overview-battery-overview-percentage" style={{ width: `${selectedBirdBox?.battery}%` }}>
                                    &nbsp;
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="div-dashboard-view-overview-recent-images-container">
                    <header className="header-dashboard-view-overview-recent-images-container">
                        <div className="div-header-dashboard-view-overview-recent-images-info-container">
                            <ion-icon src="/media/icons/icon-camera.svg" />
                            <h4>Recent Images</h4>
                        </div>
                        <button onClick={onToggleInnerView} data-inner-view-name="gallery">
                            <span>View All</span>
                        </button>
                    </header>
                    {recentImages?.length ? (
                        <ul className="dashboard-view-overview-recent-images-list">
                            {Array.from({ length: 6 }).map((_, i) => {
                                if (recentImages[i]) {
                                    return (
                                        <li key={i} className="dashboard-view-overview-recent-images-list-item clickable" onClick={handleToggleImageModal}>
                                            <img src={`${SERVER}${recentImages[i].fileUrl}`} alt="Alt Text Goes Here" data-json={JSON.stringify(recentImages[i])} />
                                        </li>
                                    );
                                }

                                return (
                                    <li key={i} className="dashboard-view-overview-recent-images-list-item">
                                        <ion-icon src="/media/icons/icon-camera.svg" />
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>There are currently no images available to display.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Overview;
