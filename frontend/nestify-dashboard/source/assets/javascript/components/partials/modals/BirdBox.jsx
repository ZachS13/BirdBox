// IMPORTED CORE MODULES
import { useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/birdbox.css";
import "../../../../css/responsive/partials/modals/birdbox.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../../config";

const BirdBox = function ({ setBirdBoxes, setNotificationVisibility, setNotificationStatus, setNotificationMessage, onToggleBirdBoxModal }) {
    const [inputFocused, setInputFocused] = useState({});
    const [birdBoxName, setBirdBoxName] = useState("");
    const [birdBoxLocationName, setBirdBoxLocationName] = useState("");
    const [birdBoxLatitude, setBirdBoxLatitude] = useState("");
    const [birdBoxLongitude, setBirdBoxLongitude] = useState("");

    const handleSetInputFocused = (e) => setInputFocused((ids) => ({ ...ids, [e.target.getAttribute("id")]: true }));

    const handleSetBirdBoxName = (e) => setBirdBoxName(e.target.value);

    const handleSetBirdBoxLocationName = (e) => setBirdBoxLocationName(e.target.value);

    const handleSetBirdBoxLatitude = (e) => setBirdBoxLatitude(e.target.value);

    const handleSetBirdBoxLongitude = (e) => setBirdBoxLongitude(e.target.value);

    const handleBirdBoxFormSubmit = async (e) => {
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

        setBirdBoxes((boxes) => [...boxes, response.data]);

        onToggleBirdBoxModal();
    };

    return (
        <div className="div-birdbox-modal-container">
            <div className="div-birdbox-modal">
                <header className="header-birdbox-modal">
                    <div className="div-header-birdbox-modal-info-container">
                        <ion-icon src="/media/icons/icon-plus.svg" />
                        <h2>Add BirdBox</h2>
                    </div>
                    <button onClick={onToggleBirdBoxModal}>
                        <ion-icon src="/media/icons/icon-close.svg" />
                    </button>
                </header>
                <form className="form-birdbox-modal" onSubmit={handleBirdBoxFormSubmit} action="/boxes" method="POST">
                    <div className="div-form-birdbox-input-container">
                        <label htmlFor="box-name">Box Name *</label>
                        <input id="box-name" type="text" name="box-name" onChange={handleSetBirdBoxName} onBlur={handleSetInputFocused} placeholder="BirdBox 1" />
                        <span className={inputFocused["box-name"] && !birdBoxName ? "visible" : "hidden"}>The box's name is required.</span>
                    </div>
                    <div className="div-form-birdbox-input-container">
                        <label htmlFor="location-name">Location Name *</label>
                        <input id="location-name" type="text" name="location-name" onChange={handleSetBirdBoxLocationName} onBlur={handleSetInputFocused} placeholder="Cornwall Preserve" />
                        <span className={inputFocused["location-name"] && !birdBoxLocationName ? "visible" : "hidden"}>The box's location name is required.</span>
                    </div>
                    <div className="div-form-birdbox-multi-input-container">
                        <div className="div-form-birdbox-input-container">
                            <label htmlFor="latitude">Latitude *</label>
                            <input id="latitude" type="text" name="latitude" onChange={handleSetBirdBoxLatitude} onBlur={handleSetInputFocused} placeholder="--" />
                            <span className={inputFocused.latitude && !birdBoxLatitude ? "visible" : "hidden"}>The box's latitude is required.</span>
                        </div>
                        <div className="div-form-birdbox-input-container">
                            <label htmlFor="longitude">Longitude *</label>
                            <input id="longitude" type="text" name="longitude" onChange={handleSetBirdBoxLongitude} onBlur={handleSetInputFocused} placeholder="--" />
                            <span className={inputFocused.longitude && !birdBoxLongitude ? "visible" : "hidden"}>The box's longitude is required.</span>
                        </div>
                    </div>
                    <button type="submit">
                        <ion-icon src="/media/icons/icon-selected.svg" />
                        <span>Add BirdBox</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BirdBox;
