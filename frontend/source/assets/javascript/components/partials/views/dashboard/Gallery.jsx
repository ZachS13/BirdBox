import { Activity, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/dashboard/gallery.css";
import "../../../../../css/responsive/partials/views/dashboard/gallery.css";
// IMPORTED MODULES
import { SERVER } from "../../../../../../config.js";
import { formatDateTimeForUser } from "../../../../helpers/datetime.js";
import ImageModal from "../../modals/Image";

const Gallery = function ({ images }) {
    const [galleryLayout, setGalleryLayout] = useState("grid");
    const [isViewingImage, setIsViewingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleToggleGalleryLayout = (e) => setGalleryLayout(e.target.closest("button").dataset.layout);

    const handleToggleImageModal = (e) => {
        const { target } = e;

        setIsViewingImage((value) => !value);

        const item = target.closest("li");

        // Guard clause.
        if (!item) return setSelectedImage(null);

        const { json } = item.dataset;

        const image = JSON.parse(json);

        setSelectedImage(image);
    };

    return (
        <>
            {isViewingImage && <ImageModal selectedImage={selectedImage} onToggleImageModal={handleToggleImageModal} />}
            <div className="div-dashboard-view-gallery-container">
                <header className="header-dashboard-view-gallery-container">
                    <h2>Collected Images</h2>
                    <div className="div-header-dashboard-view-gallery-info-container">
                        <span>{images?.length} Images</span>
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
                {images?.length ? (
                    galleryLayout === "grid" ? (
                        <ul className="dashboard-view-gallery-grid-layout-list">
                            {images.map((image, i) => {
                                const { date, time } = formatDateTimeForUser(image.capturedAt);
                                const fileSizeInMb = (+image.fileSize / 1024 ** 2).toFixed(2);

                                return (
                                    <li key={i} className={`dashboard-view-gallery-grid-layout-list-item${image.id === selectedImage?.id ? " active" : ""}`} onClick={handleToggleImageModal} data-json={JSON.stringify(image)}>
                                        <div className="div-dashboard-view-gallery-grid-layout-list-item-image-container">
                                            <span>{image.speciesName}</span>
                                            <img src={`${SERVER}${image.fileUrl}`} alt="Alt Text Goes Here" />
                                        </div>
                                        <div className="div-dashboard-view-gallery-grid-layout-list-item-image-details-container">
                                            <div className="div-dashboard-view-gallery-grid-layout-list-item-image-timestamp-container">
                                                <p>{date}</p>
                                                <p>{time}</p>
                                            </div>
                                            <div className="div-dashboard-view-gallery-grid-layout-list-item-image-description-container">
                                                {/* <p>Perching</p> */}
                                                <p>{image.confidencePct}% Confidence</p>
                                                <p>Size: {fileSizeInMb} MB</p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <ul className="dashboard-view-gallery-list-layout-list">
                            {images.map((image, i) => {
                                const { date, time } = formatDateTimeForUser(image.capturedAt);
                                const fileSizeInMb = (+image.fileSize / 1024 ** 2).toFixed(2);

                                return (
                                    <li key={i} className={`dashboard-view-gallery-list-layout-list-item${image.id === selectedImage?.id ? " active" : ""}`} onClick={handleToggleImageModal} data-json={JSON.stringify(image)}>
                                        <span>{image.speciesName}</span>
                                        <div className="div-dashboard-view-gallery-list-layout-list-item-image-overview-container">
                                            <div className="div-dashboard-view-gallery-list-layout-list-item-image-container">
                                                <img src={`${SERVER}${image.fileUrl}`} alt="Alt Text Goes Here" />
                                            </div>
                                            <div className="div-dashboard-view-gallery-list-layout-list-item-image-details-container">
                                                <p>
                                                    {date} @ {time}
                                                </p>
                                                <div className="div-dashboard-view-gallery-list-layout-list-item-image-description-container">
                                                    {/* <p>Perching</p> */}
                                                    <p>{image.confidencePct}% Confidence</p>
                                                </div>
                                            </div>
                                            <p>Size: {fileSizeInMb} MB</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )
                ) : (
                    <p>There are currently no images available to display.</p>
                )}
            </div>
        </>
    );
};

export default Gallery;
