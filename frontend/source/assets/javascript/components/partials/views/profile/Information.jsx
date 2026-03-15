// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/profile/information.css";

const Information = function ({ activeUser, isDisabled }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSetUsername = (e) => setUsername(e.target.value);

    const handleSetEmail = (e) => setEmail(e.target.value);

    useEffect(() => {
        setUsername(activeUser.username);
        setEmail(activeUser.email);
    }, [activeUser]);

    return (
        <div className="div-profile-view-information-container">
            <header className="header-profile-view-information-container">
                <ion-icon src="/media/icons/icon-user.svg" />
                <h2>Profile Information</h2>
            </header>
            <div className="div-form-profile-view-information-container">
                <div className={`div-form-profile-view-information-input-container${isDisabled ? " disabled" : ""}`}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" name="username" value={username} onChange={handleSetUsername} autoComplete="on" disabled={isDisabled} />
                    <span className={!username ? "visible" : "hidden"}>A username is required.</span>
                </div>
                <div className={`div-form-profile-view-information-input-container${isDisabled ? " disabled" : ""}`}>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" value={email} onChange={handleSetEmail} autoComplete="on" disabled={isDisabled} />
                    <span className={!email ? "visible" : "hidden"}>An email address is required.</span>
                </div>
            </div>
        </div>
    );
};

export default Information;
