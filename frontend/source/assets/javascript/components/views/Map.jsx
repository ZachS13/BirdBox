// IMPORTED CORE MODULES
import { Activity, useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../css/views/map.css";
import "../../../css/responsive/views/map.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../config";
import PageLoader from "../partials/loaders/Page";
import DetailsModal from "../partials/modals/Details";
import BirdBoxModal from "../partials/modals/BirdBox";
import Nav from "../partials/Nav";
import PigeonMap from "../partials/views/map/Pigeon";
import BirdBoxesList from "../partials/views/map/BirdBoxes";
import NotificationModal from "../partials/modals/Notification";

const Map = function () {
    const [isViewLoading, setIsViewLoading] = useState(true);
    const [isAddingBox, setIsAddingBox] = useState(false);
    const [isViewingDetails, setIsViewingDetails] = useState(false);
    const [isViewingBoxes, setIsViewingBoxes] = useState(false);
    const [birdBoxes, setBirdBoxes] = useState([]);
    const [selectedBirdBox, setSelectedBirdBox] = useState(null);
    const [notificationVisibility, setNotificationVisibility] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const handleToggleBirdBoxModal = () => setIsAddingBox((value) => !value);

    const handleToggleDetailsModal = () => setIsViewingDetails((value) => !value);

    const handleToggleBirdBoxesList = () => setIsViewingBoxes((value) => !value);

    const handleSetSelectedBirdBox = (e) => {
        const coordinates = e.anchor;

        // Guard clause.
        if (!coordinates) return;

        const [cooLat, cooLng] = coordinates;

        setSelectedBirdBox(birdBoxes.find(({ lat, lng }) => Number(lat).toFixed(6) === cooLat.toFixed(6) && Number(lng).toFixed(6) === cooLng.toFixed(6)));

        setIsViewingDetails(true);
    };

    useEffect(function () {
        document.title = "Nestify | Map";

        const loadingTimer = setTimeout(() => setIsViewLoading(false), 800);

        return () => clearTimeout(loadingTimer);
    }, []);

    useEffect(() => {
        (async () => {
            const request = await fetch(`${SERVER}/boxes`);

            const response = await request.json();

            // Guard clause.
            if (!response.success) return;

            setBirdBoxes(response.data);
        })();
    }, [birdBoxes]);

    return (
        <>
            <PageLoader isViewLoading={isViewLoading} />
            {isAddingBox && (
                <BirdBoxModal
                    setBirdBoxes={setBirdBoxes}
                    setNotificationVisibility={setNotificationVisibility}
                    setNotificationStatus={setNotificationStatus}
                    setNotificationMessage={setNotificationMessage}
                    onToggleBirdBoxModal={handleToggleBirdBoxModal}
                />
            )}
            {isViewingDetails && <DetailsModal selectedBirdBox={selectedBirdBox} onToggleDetailsModal={handleToggleDetailsModal} />}
            <Nav />
            <div className="div-main-edge-container">
                <div className="div-map-view-container">
                    <PigeonMap birdBoxes={birdBoxes} onSetSelectedBirdBox={handleSetSelectedBirdBox} onToggleBirdBoxesList={handleToggleBirdBoxesList} />
                    <BirdBoxesList birdBoxes={birdBoxes} isAddingBox={isAddingBox} onToggleBirdBoxModal={handleToggleBirdBoxModal} isViewingBoxes={isViewingBoxes} onToggleBirdBoxesList={handleToggleBirdBoxesList} />
                </div>
            </div>
            <NotificationModal visibility={notificationVisibility} setNotificationVisibility={setNotificationVisibility} status={notificationStatus} message={notificationMessage} />
        </>
    );
};

export default Map;
