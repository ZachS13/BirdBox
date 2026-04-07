// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/image.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../config.js";
import { formatDateTimeForUser } from "../../../helpers/datetime.js";

const Image = function ({ selectedImage, onToggleImageModal }) {
    const { date, time } = formatDateTimeForUser(selectedImage.capturedAt);
    const fileSizeInMb = (+selectedImage.fileSize / 1024 ** 2).toFixed(2);

    const handleSelectedImageDownload = async (e) => {
        const { target } = e;

        const url = target.dataset.url;
        const speciesName = target.dataset.species;
        const capturedAt = target.dataset.capturedAt;
        const type = target.dataset.type;

        const request = await fetch(url);

        const response = await request.blob();

        // Guard clause.
        if (!response) return;

        const imageUrl = URL.createObjectURL(response);

        const anchor = document.createElement("a");

        anchor.href = imageUrl;
        const date = capturedAt.split(" ")[0];
        anchor.download = `${speciesName} (${date}).${type}`;
        anchor.click();

        URL.revokeObjectURL(imageUrl);
    };

    return (
        <div className="div-image-details-modal-container">
            <div className="div-image-details-modal">
                <header className="header-image-details-modal">
                    <div className="div-header-image-details-modal-info-container">
                        <ion-icon src="/media/icons/icon-camera.svg" />
                        <h2>Image Details</h2>
                    </div>
                    <button onClick={onToggleImageModal}>
                        <ion-icon src="/media/icons/icon-close.svg" />
                    </button>
                </header>
                <div className="div-image-details-modal-overview-container">
                    <div className="div-image-details-modal-image-overview-container">
                        <div className="div-image-details-modal-image-container">
                            <img src={`${SERVER}${selectedImage.fileUrl}`} alt="Alt Text Goes Here" />
                        </div>
                        <button onClick={handleSelectedImageDownload} data-url={`${SERVER}${selectedImage.fileUrl}`} data-species={selectedImage.speciesName} data-captured-at={selectedImage.capturedAt} data-type={selectedImage.fileType}>
                            <ion-icon src="/media/icons/icon-download.svg" />
                            <span>Download</span>
                        </button>
                    </div>
                    <ul className="image-details-modal-overview-info-list">
                        <li className="image-details-modal-overview-info-list-item">
                            <h4>Timestamp</h4>
                            <p>
                                {date} @ {time}
                            </p>
                        </li>
                        <li className="image-details-modal-overview-info-list-item">
                            <h4>Species Identification</h4>
                            <p>{selectedImage.speciesName}</p>
                        </li>
                        <li className="image-details-modal-overview-info-list-item">
                            <h4>Species Detection</h4>
                            <p>{selectedImage.confidencePct}% Confidence</p>
                        </li>
                        <li className="image-details-modal-overview-info-list-item">
                            <h4>File Information</h4>
                            <p>Size: {fileSizeInMb} MB</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Image;
