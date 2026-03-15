// IMPORTED STYLESHEETS
import "../../../../css/partials/signs/upload.css";

const Upload = function ({ isUploadingData, onToggleUploadModal }) {
    return (
        <div className="div-upload-sign-container">
            <p>No data to display. Upload data to view information.</p>
            <button className={`${isUploadingData ? "active" : ""}`} onClick={onToggleUploadModal}>
                <ion-icon src="/media/icons/icon-upload.svg" />
                <span>Upload Data</span>
            </button>
        </div>
    );
};

export default Upload;
