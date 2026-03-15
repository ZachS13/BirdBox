// IMPORTED CORE MODULES
import { useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/profile/password.css";

const Password = function ({ isDisabled }) {
    const [inputFocused, setInputFocused] = useState({});
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSetInputFocused = (e) => setInputFocused((ids) => ({ ...ids, [e.target.getAttribute("id")]: true }));

    const handleSetCurrentPassword = (e) => setCurrentPassword(e.target.value);

    const handleSetNewPassword = (e) => setNewPassword(e.target.value);

    const handleSetConfirmPassword = (e) => setConfirmPassword(e.target.value);

    return (
        <div className="div-profile-view-password-container">
            <header className="header-profile-view-password-container">
                <ion-icon src="/media/icons/icon-password.svg" />
                <h2>Password</h2>
            </header>
            <div className="div-form-profile-view-password-container">
                <div className={`div-form-profile-view-password-input-container${isDisabled ? " disabled" : ""}`}>
                    <label htmlFor="current-password">Current Password</label>
                    <input id="current-password" type="password" name="current-password" onChange={handleSetCurrentPassword} onBlur={handleSetInputFocused} autoComplete="on" disabled={isDisabled} />
                    <span className={inputFocused["current-password"] && !currentPassword ? "visible" : "hidden"}>You must provide the current password.</span>
                </div>
                {isDisabled || (
                    <>
                        <div className={`div-form-profile-view-password-input-container${isDisabled ? " disabled" : ""}`}>
                            <label htmlFor="new-password">New Password</label>
                            <input id="new-password" type="password" name="new-password" onChange={handleSetNewPassword} disabled={isDisabled} />
                            <span className={newPassword.length < 8 ? "invalid" : "valid"}>Password must be at least 8 characters.</span>
                        </div>
                        <div className={`div-form-profile-view-password-input-container${isDisabled ? " disabled" : ""}`}>
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input id="confirm-password" type="password" name="confirm-password" onChange={handleSetConfirmPassword} disabled={isDisabled} />
                            <span className={newPassword.length && newPassword === confirmPassword ? "valid" : "invalid"}>Passwords must match.</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Password;
