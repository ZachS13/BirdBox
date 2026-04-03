// IMPORTED CORE MODULES
import { Activity, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// IMPORTED STYLESHEETS
import "../../../css/views/dashboard.css";
import "../../../css/responsive/views/dashboard.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../config.js";
import PageLoader from "../partials/loaders/Page";
import BirdBoxModal from "../partials/modals/BirdBox";
import ExportModal from "../partials/modals/Export";
import UploadModal from "../partials/modals/Upload";
import Nav from "../partials/Nav";
import UploadSign from "../partials/signs/Upload";
import General from "../partials/views/dashboard/General";
import Overview from "../partials/views/dashboard/Overview";
import Analytics from "../partials/views/dashboard/Analytics";
import Gallery from "../partials/views/dashboard/Gallery";
import Maintenance from "../partials/views/dashboard/Maintenance";
import Settings from "../partials/views/dashboard/Settings";
import NotificationModal from "../partials/modals/Notification";

const Dashboard = function () {
    const [isViewLoading, setIsViewLoading] = useState(true);
    const [isAddingBox, setIsAddingBox] = useState(false);
    const [birdBoxes, setBirdBoxes] = useState([]);
    const [isSelectingBirdBox, setIsSelectingBirdBox] = useState(false);
    const [selectedBirdBox, setSelectedBirdBox] = useState(null);
    const [isExportingData, setIsExportingData] = useState(false);
    const [isUploadingData, setIsUploadingData] = useState(false);
    const [selectedInnerView, setSelectedInnerView] = useState("overview");
    const [notificationVisibility, setNotificationVisibility] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const { id: paramsId } = useParams();

    const totalBirdBoxes = birdBoxes.length;

    const handleToggleSelectingBirdBox = (e) => {
        setIsSelectingBirdBox((value) => !value);

        const option = e.target.closest("li");

        // Guard clause.
        if (!option) return;

        const dataId = +option.dataset.id;

        // Guard clause.
        if (dataId === +paramsId) return;

        setIsViewLoading(true);
    };

    const handleToggleBirdBoxModal = () => setIsAddingBox((value) => !value);

    const handleToggleExportModal = () => setIsExportingData((value) => !value);

    const handleToggleUploadModal = () => setIsUploadingData((value) => !value);

    const handleToggleInnerView = (e) => setSelectedInnerView(e.target.closest("button").dataset.innerViewName);

    useEffect(() => {
        document.title = "Nestify | Dashboard";

        const loadingTimer = setTimeout(() => setIsViewLoading(false), 800);

        (async () => {
            const request = await fetch(`${SERVER}/boxes`);

            const response = await request.json();

            // console.log(response);

            // Guard clause.
            if (!response.success) return;

            const { data: boxes } = response;

            setSelectedBirdBox(boxes[0]);

            setBirdBoxes(boxes);
        })();

        return () => clearTimeout(loadingTimer);
    }, []);

    useEffect(() => {
        const loadingTimer = setTimeout(() => setIsViewLoading(false), 800);

        setTimeout(() => {
            const boxId = +paramsId || 1;

            setSelectedBirdBox(birdBoxes.find(({ id }) => boxId === id));

            setSelectedInnerView("overview");
        }, 400);

        return () => clearTimeout(loadingTimer);
    }, [birdBoxes, paramsId]);

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
            {isExportingData && <ExportModal onToggleExportModal={handleToggleExportModal} />}
            {isUploadingData && <UploadModal birdBoxes={birdBoxes} onToggleUploadModal={handleToggleUploadModal} />}
            <Nav />
            <div className="div-main-edge-container">
                <div className="div-dashboard-view-container">
                    <header className="header-dashboard-view-container">
                        <div className="div-header-dashboard-view-birdbox-info-container">
                            <h2>{selectedBirdBox?.name}</h2>
                            <p>{selectedBirdBox?.trail}</p>
                        </div>
                        <div className="div-dashboard-view-birdbox-editable-container">
                            <div className="div-birdbox-select-container">
                                <div className="div-selected-birdbox-info-container" onClick={handleToggleSelectingBirdBox}>
                                    <div className="div-selected-birdbox-name-container">
                                        <ion-icon src="/media/icons/icon-dot.svg" />
                                        <p>
                                            Box {selectedBirdBox?.id} - {selectedBirdBox?.trail}
                                        </p>
                                    </div>
                                    <ion-icon src={`/media/icons/icon-chevron-${isSelectingBirdBox ? "up" : "down"}.svg`} />
                                </div>
                                {isSelectingBirdBox && (
                                    <ul className="birdbox-options-list">
                                        {birdBoxes.map(({ id, trail }, i) => {
                                            return (
                                                <li key={i} className={`birdbox-options-list-item${selectedBirdBox.id === id ? " active" : ""}`} onClick={handleToggleSelectingBirdBox} data-id={id}>
                                                    <Link to={`/dashboard/${id}`}>
                                                        <span>
                                                            Box {id} - {trail}
                                                        </span>
                                                        <ion-icon src="/media/icons/icon-selected.svg" />
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                            <button className={`${isAddingBox ? "active" : ""}`} onClick={handleToggleBirdBoxModal}>
                                <ion-icon src="/media/icons/icon-plus.svg" />
                            </button>
                        </div>
                    </header>
                    <Activity mode={totalBirdBoxes ? "hidden" : "visible"}>
                        <UploadSign isUploadingData={isUploadingData} onToggleUploadModal={handleToggleUploadModal} />
                    </Activity>
                    <Activity mode={totalBirdBoxes ? "visible" : "hidden"}>
                        <General
                            isExportingData={isExportingData}
                            onToggleExportModal={handleToggleExportModal}
                            isUploadingData={isUploadingData}
                            onToggleUploadModal={handleToggleUploadModal}
                            selectedInnerView={selectedInnerView}
                            onToggleInnerView={handleToggleInnerView}
                        />
                        <Activity mode={selectedInnerView === "overview" ? "visible" : "hidden"}>
                            <Overview selectedBirdBox={selectedBirdBox} onToggleInnerView={handleToggleInnerView} />
                        </Activity>
                        <Activity mode={selectedInnerView === "analytics" ? "visible" : "hidden"}>
                            <Analytics />
                        </Activity>
                        <Activity mode={selectedInnerView === "gallery" ? "visible" : "hidden"}>
                            <Gallery images={selectedBirdBox?.images} />
                        </Activity>
                        <Activity mode={selectedInnerView === "maintenance" ? "visible" : "hidden"}>
                            <Maintenance selectedBirdBox={selectedBirdBox} />
                        </Activity>
                        <Activity mode={selectedInnerView === "settings" ? "visible" : "hidden"}>
                            <Settings
                                selectedBirdBox={selectedBirdBox}
                                setSelectedBirdBox={setSelectedBirdBox}
                                setNotificationVisibility={setNotificationVisibility}
                                setNotificationStatus={setNotificationStatus}
                                setNotificationMessage={setNotificationMessage}
                            />
                        </Activity>
                    </Activity>
                </div>
            </div>
            <NotificationModal visibility={notificationVisibility} setNotificationVisibility={setNotificationVisibility} status={notificationStatus} message={notificationMessage} />
        </>
    );
};

export default Dashboard;
