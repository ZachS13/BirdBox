// IMPORTED CORE MODULES
import { Link } from "react-router-dom";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/map/birdboxes.css";
import "../../../../../css/responsive/partials/views/map/birdboxes.css";

const BirdBoxes = function ({ birdBoxes, isAddingBox, onToggleBirdBoxModal, isViewingBoxes, onToggleBirdBoxesList }) {
    return (
        <>
            <div className={`div-map-view-birdboxes-list-container${isViewingBoxes ? " active" : ""}`}>
                <header className="header-map-view-birdboxes-list-container">
                    <div className="div-header-map-view-birdboxes-list-info-container">
                        <ion-icon src="/media/icons/icon-bird-house.svg" />
                        <h2>BirdBoxes</h2>
                    </div>
                    <button className={`${isAddingBox ? "active" : ""}`} onClick={onToggleBirdBoxModal}>
                        <ion-icon src="/media/icons/icon-plus.svg" />
                    </button>
                </header>
                <ul className="map-view-birdboxes-list">
                    {birdBoxes.map(({ id, name, trail }, i) => {
                        return (
                            <li key={i} className="map-view-birdboxes-list-item">
                                <p>{name}</p>
                                <span>{trail}</span>
                                <Link to={`/dashboard/${id}`} />
                            </li>
                        );
                    })}
                </ul>
                <footer className="footer-map-view-birdboxes-list-container">
                    <button onClick={onToggleBirdBoxesList}>
                        <ion-icon src="/media/icons/icon-close.svg" />
                        <span>Close</span>
                    </button>
                </footer>
            </div>
            <div className={`div-map-view-birdboxes-container-overlay${isViewingBoxes ? " active" : ""}`}>&nbsp;</div>
        </>
    );
};

export default BirdBoxes;
