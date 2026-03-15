import { Activity, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/dashboard/gallery.css";
import "../../../../../css/responsive/partials/views/dashboard/gallery.css";
// IMPORTED MODULES
import ImageModal from "../../modals/Image";

const Gallery = function () {
    const [isViewingImage, setIsViewingImage] = useState(false);
    const [galleryLayout, setGalleryLayout] = useState("grid");

    const handleToggleImageModal = () => setIsViewingImage((value) => !value);

    const handleToggleGalleryLayout = (e) => setGalleryLayout(e.target.closest("button").dataset.layout);

    return (
        <>
            {isViewingImage && <ImageModal onToggleImageModal={handleToggleImageModal} />}
            <div className="div-dashboard-view-gallery-container">
                <header className="header-dashboard-view-gallery-container">
                    <h2>Collected Images</h2>
                    <div className="div-header-dashboard-view-gallery-info-container">
                        <span>6 Images</span>
                        <div className="div-header-dashboard-view-gallery-toggle-container">
                            <button className={`${galleryLayout === "grid" ? "active" : ""}`} onClick={handleToggleGalleryLayout} data-layout="grid">
                                <ion-icon src="/media/icons/icon-grid.svg" />
                            </button>
                            <button className={`${galleryLayout === "list" ? "active" : ""}`} onClick={handleToggleGalleryLayout} data-layout="list">
                                <ion-icon src="/media/icons/icon-list.svg" />
                            </button>
                        </div>
                    </div>
                </header>
                {galleryLayout === "grid" && (
                    <ul className="dashboard-view-gallery-grid-layout-list">
                        <li className="dashboard-view-gallery-grid-layout-list-item" onClick={handleToggleImageModal}>
                            <div className="div-dashboard-view-gallery-grid-layout-list-item-image-container">
                                <span>American Kestrel</span>
                                <ion-icon src="/media/icons/icon-camera.svg" />
                            </div>
                            <div className="div-dashboard-view-gallery-grid-layout-list-item-image-details-container">
                                <div className="div-dashboard-view-gallery-grid-layout-list-item-image-timestamp-container">
                                    <p>01/13/26</p>
                                    <p>08:00 am</p>
                                </div>
                                <div className="div-dashboard-view-gallery-grid-layout-list-item-image-description-container">
                                    <p>Perching</p>
                                    <p>95% Confidence</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                )}
                {galleryLayout === "list" && (
                    <ul className="dashboard-view-gallery-list-layout-list">
                        <li className="dashboard-view-gallery-list-layout-list-item" onClick={handleToggleImageModal}>
                            <span>American Kestrel</span>
                            <div className="div-dashboard-view-gallery-list-layout-list-item-image-overview-container">
                                <div className="div-dashboard-view-gallery-list-layout-list-item-image-container">
                                    <ion-icon src="/media/icons/icon-camera.svg" />
                                </div>
                                <div className="div-dashboard-view-gallery-list-layout-list-item-image-details-container">
                                    <p>01/13/26 @ 08:00 am</p>
                                    <div className="div-dashboard-view-gallery-list-layout-list-item-image-description-container">
                                        <p>Perching</p>
                                        <p>95% Confidence</p>
                                    </div>
                                </div>
                                <p>Size: 2.5 MB</p>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
};

export default Gallery;
