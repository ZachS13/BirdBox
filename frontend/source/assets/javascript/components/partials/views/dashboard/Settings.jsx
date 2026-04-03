// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/dashboard/settings.css";
import "../../../../../css/responsive/partials/views/dashboard/settings.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../../config.js";

const Settings = function ({ selectedBirdBox, setSelectedBirdBox, setNotificationVisibility, setNotificationStatus, setNotificationMessage }) {
    const [inputFocused, setInputFocused] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const [birdBoxName, setBirdBoxName] = useState("");
    const [birdBoxLocationName, setBirdBoxLocationName] = useState("");
    const [birdBoxLatitude, setBirdBoxLatitude] = useState("");
    const [birdBoxLongitude, setBirdBoxLongitude] = useState("");
    const [birdBoxNotes, setBirdBoxNotes] = useState("");

    const handleSetInputFocused = (e) => setInputFocused((ids) => ({ ...ids, [e.target.getAttribute("id")]: true }));

    const handleSetIsDisabled = () => setIsDisabled((value) => !value);

    const handleSetBirdBoxName = (e) => setBirdBoxName(e.target.value);

    const handleSetBirdBoxLocationName = (e) => setBirdBoxLocationName(e.target.value);

    const handleSetBirdBoxLatitude = (e) => setBirdBoxLatitude(e.target.value);

    const handleSetBirdBoxLongitude = (e) => setBirdBoxLongitude(e.target.value);

    const handleSetBirdBoxNotes = (e) => setBirdBoxNotes(e.target.value);

    const handleBirdBoxSettingsSubmit = async (e) => {
        e.preventDefault();

        const { target } = e;

        const url = target.getAttribute("action");
        const method = target.getAttribute("method");

        const name = target["box-name"].value;
        const trail = target["location-name"].value;
        const lat = target.latitude.value;
        const lng = target.longitude.value;

        const body = { name, trail, lat, lng };

        // Guard clause.
        for (const value of Object.values(body)) if (!value) return;

        body.notes = target.notes.value;

        const request = await fetch(`${SERVER}${url}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const response = await request.json();

        setNotificationVisibility(true);

        setTimeout(() => setNotificationVisibility(false), 5000);

        setNotificationStatus(response.success);

        setNotificationMessage(response.message);

        // Guard clause.
        if (!response.success) return;

        setSelectedBirdBox(response.data);

        setIsDisabled(true);
    };

    useEffect(() => {
        setBirdBoxName(selectedBirdBox.name);
        setBirdBoxLocationName(selectedBirdBox.trail);
        setBirdBoxLatitude(+selectedBirdBox.lat);
        setBirdBoxLongitude(+selectedBirdBox.lng);
        setBirdBoxNotes(selectedBirdBox.notes);
    }, [selectedBirdBox]);

    return (
        <div className="div-dashboard-view-settings-container">
            <form className="form-dashboard-view-settings-container" onSubmit={handleBirdBoxSettingsSubmit} action={`/boxes/${selectedBirdBox?.id}`} method="PUT">
                <header className="header-dashboard-view-settings-container">
                    <h2>BirdBox Configuration</h2>
                    <div className="div-header-dashboard-view-settings-edit-container">
                        {isDisabled && (
                            <button onClick={handleSetIsDisabled} type="button">
                                <ion-icon src="/media/icons/icon-edit.svg" />
                                <span>Edit Box</span>
                            </button>
                        )}
                        {isDisabled || (
                            <div className="div-header-dashboard-view-settings-editable-container">
                                <button onClick={handleSetIsDisabled} type="button">
                                    <ion-icon src="/media/icons/icon-close.svg" />
                                    <span>Close</span>
                                </button>
                                <button type="submit">
                                    <ion-icon src="/media/icons/icon-save.svg" />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        )}
                    </div>
                </header>
                <div className="div-form-dashboard-view-settings-container">
                    <div className="div-form-dashboard-view-settings-multi-input-container">
                        <div className={`div-form-dashboard-view-settings-input-container${isDisabled ? " disabled" : ""}`}>
                            <label htmlFor="box-name">Box Name</label>
                            <input id="box-name" type="text" name="box-name" value={birdBoxName} onChange={handleSetBirdBoxName} onBlur={handleSetInputFocused} placeholder="BirdBox 1" disabled={isDisabled} />
                            <span className={inputFocused["box-name"] && !birdBoxName ? "visible" : "hidden"}>The box's name is required.</span>
                        </div>
                        <div className={`div-form-dashboard-view-settings-input-container${isDisabled ? " disabled" : ""}`}>
                            <label htmlFor="location-name">Location Name</label>
                            <input
                                id="location-name"
                                type="text"
                                name="location-name"
                                value={birdBoxLocationName}
                                onChange={handleSetBirdBoxLocationName}
                                onBlur={handleSetInputFocused}
                                placeholder="Cornwall Preserve"
                                disabled={isDisabled}
                            />
                            <span className={inputFocused["location-name"] && !birdBoxLocationName ? "visible" : "hidden"}>The box's location name is required.</span>
                        </div>
                    </div>
                    <div className="div-form-dashboard-view-settings-multi-input-container">
                        <div className={`div-form-dashboard-view-settings-input-container${isDisabled ? " disabled" : ""}`}>
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" type="text" name="latitude" value={birdBoxLatitude} onChange={handleSetBirdBoxLatitude} onBlur={handleSetInputFocused} placeholder="--" disabled={isDisabled} />
                            <span className={inputFocused["latitude"] && !birdBoxLatitude ? "visible" : "hidden"}>The box's latitude is required.</span>
                        </div>
                        <div className={`div-form-dashboard-view-settings-input-container${isDisabled ? " disabled" : ""}`}>
                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" type="text" name="longitude" value={birdBoxLongitude} onChange={handleSetBirdBoxLongitude} onBlur={handleSetInputFocused} placeholder="--" disabled={isDisabled} />
                            <span className={inputFocused["longitude"] && !birdBoxLongitude ? "visible" : "hidden"}>The box's longitude is required.</span>
                        </div>
                    </div>
                    <div className={`div-form-dashboard-view-settings-input-container${isDisabled ? " disabled" : ""}`}>
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" name="notes" value={birdBoxNotes} onChange={handleSetBirdBoxNotes} rows="8" placeholder="Additional notes about this box..." disabled={isDisabled}></textarea>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Settings;
