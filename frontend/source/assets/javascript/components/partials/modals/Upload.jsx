// IMPORTED CORE MODULES
import { useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/upload.css";

const Upload = function ({ birdBoxes, onToggleUploadModal }) {
    const [isSelectingBirdBox, setIsSelectingBirdBox] = useState(false);
    const [uploadFileName, setUploadFileName] = useState("");
    const [uploadFileSource, setUploadFileSource] = useState(null);
    const [selectedBirdBox, setSelectedBirdBox] = useState(() => ({ id: 0, trail: "Choose a BirdBox" }));

    const handleIsSelectingBirdBox = (e) => {
        setIsSelectingBirdBox((value) => !value);

        const option = e.target.closest("li");

        // Guard clause.
        if (!option) return;

        const dataId = +option.dataset.id;

        // Guard clause.
        if (!dataId) return setSelectedBirdBox({ id: 0, trail: "Choose a BirdBox" });

        setSelectedBirdBox(birdBoxes.find(({ id }) => id === dataId));
    };

    const handleSetUploadFileData = (e) => {
        setUploadFileName((v) => e.target.files[0]?.name || v);

        setUploadFileSource((v) => e.target.files[0] || v);
    };

    return (
        <div className="div-upload-modal-container">
            <div className="div-upload-modal">
                <header className="header-upload-modal">
                    <div className="div-header-upload-modal-info-container">
                        <ion-icon src="/media/icons/icon-upload.svg" />
                        <h2>Upload Data to BirdBox</h2>
                    </div>
                    <button onClick={onToggleUploadModal}>
                        <ion-icon src="/media/icons/icon-close.svg" />
                    </button>
                </header>
                <form className="form-upload-modal" action="" method="POST">
                    <div className="div-form-upload-input-container">
                        <label htmlFor="target-file">Target File</label>
                        <input id="target-file" type="file" name="target-file" onChange={handleSetUploadFileData} accept=".json" />
                        <label htmlFor="target-file">{uploadFileName || "Choose a File"}</label>
                    </div>
                    <div className="div-form-upload-input-container">
                        <span>Target Box</span>
                        <div className="div-target-box-select-container">
                            <div className="div-selected-target-box-info-container" onClick={handleIsSelectingBirdBox}>
                                <p>
                                    {selectedBirdBox.id ? `Box ${selectedBirdBox.id} -` : ""} {selectedBirdBox.trail}
                                </p>
                                <ion-icon src={`/media/icons/icon-chevron-${isSelectingBirdBox ? "up" : "down"}.svg`} />
                            </div>
                            {isSelectingBirdBox && (
                                <ul className="target-box-options-list">
                                    <li className={`target-box-options-list-item${!selectedBirdBox.id ? " active" : ""}`} onClick={handleIsSelectingBirdBox}>
                                        <span>Choose a BirdBox</span>
                                        <ion-icon src="/media/icons/icon-selected.svg" />
                                    </li>
                                    {birdBoxes.map(({ id, trail }, i) => {
                                        return (
                                            <li key={i} className={`target-box-options-list-item${selectedBirdBox.id === id ? " active" : ""}`} onClick={handleIsSelectingBirdBox} data-id={id}>
                                                <span>
                                                    Box {id} - {trail}
                                                </span>
                                                <ion-icon src="/media/icons/icon-selected.svg" />
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="div-form-upload-notice-container">
                        <p>Please make sure that the desired box matches the box data.</p>
                    </div>
                    <button type="button">
                        <ion-icon src="/media/icons/icon-upload.svg" />
                        <span>Upload Data</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
