// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/image.css";

const Image = function ({ onToggleImageModal }) {
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
                        <div className="div-image-details-modal-image-placeholder-container">
                            {/* <span>American Kestrel</span> */}
                            <ion-icon src="/media/icons/icon-camera.svg" />
                        </div>
                        <button>
                            <ion-icon src="/media/icons/icon-download.svg" />
                            <span>Download</span>
                        </button>
                    </div>
                    <ul className="image-details-modal-overview-info-list">
                        <li className="image-details-modal-overview-info-list-item">
                            <h4>Timestamp</h4>
                            <p>01/13/26 @ 08:00 am</p>
                        </li>
                        <li className="image-details-modal-overview-info-list-item">
                            <h4>Species Identification</h4>
                            <p>American Kestrel</p>
                        </li>
                        <li className="image-details-modal-overview-info-list-item">
                            <h4>Species Detection</h4>
                            <p>95% Confidence</p>
                        </li>
                        <li className="image-details-modal-overview-info-list-item">
                            <h4>File Information</h4>
                            <p>Size: 2.5 MB</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Image;
