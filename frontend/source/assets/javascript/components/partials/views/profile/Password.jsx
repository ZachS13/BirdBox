// IMPORTED CORE MODULES
import { useState } from "react";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/profile/password.css";

const Password = function ({ isDisabled }) {
    const [inputFocused, setInputFocused] = useState({});
    const [currentPassword, setCurrentPassword] = useState("");
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handleSetInputFocused = (e) => setInputFocused((ids) => ({ ...ids, [e.target.getAttribute("id")]: true }));

    const handleSetCurrentPassword = (e) => setCurrentPassword(e.target.value);

    const handleSetIsCurrentPasswordVisible = () => setIsCurrentPasswordVisible((v) => !v);

    const handleSetNewPassword = (e) => setNewPassword(e.target.value);

    const handleSetIsNewPasswordVisible = () => setIsNewPasswordVisible((v) => !v);

    const handleSetConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const handleSetIsConfirmPasswordVisible = () => setIsConfirmPasswordVisible((v) => !v);

    return (
        <div className="div-profile-view-password-container">
            <header className="header-profile-view-password-container">
                <ion-icon src="/media/icons/icon-password.svg" />
                <h2>Password</h2>
            </header>
            <div className="div-form-profile-view-password-container">
                <div className="div-form-profile-view-password-input-container">
                    <label htmlFor="current-password">Current Password</label>
                    <div className={`div-form-profile-view-password-input${isDisabled ? " disabled" : ""}`}>
                        <input id="current-password" type={isCurrentPasswordVisible ? "text" : "password"} name="current-password" onChange={handleSetCurrentPassword} onBlur={handleSetInputFocused} autoComplete="on" disabled={isDisabled} />
                        {isDisabled || (
                            <button type="button" onClick={handleSetIsCurrentPasswordVisible}>
                                <ion-icon src={`/media/icons/icon-${isCurrentPasswordVisible ? "hide" : "show"}.svg`} />
                            </button>
                        )}
                    </div>
                    <p className={inputFocused["current-password"] && !currentPassword ? "visible" : "hidden"}>You must provide the current password.</p>
                </div>
                {isDisabled || (
                    <>
                        <div className="div-form-profile-view-password-input-container">
                            <label htmlFor="new-password">New Password</label>
                            <div className={`div-form-profile-view-password-input${isDisabled ? " disabled" : ""}`}>
                                <input id="new-password" type={isNewPasswordVisible ? "text" : "password"} name="new-password" onChange={handleSetNewPassword} disabled={isDisabled} />
                                <button type="button" onClick={handleSetIsNewPasswordVisible}>
                                    <ion-icon src={`/media/icons/icon-${isNewPasswordVisible ? "hide" : "show"}.svg`} />
                                </button>
                            </div>
                            <p className={newPassword.length < 8 ? "invalid" : "valid"}>Password must be at least 8 characters.</p>
                        </div>
                        <div className="div-form-profile-view-password-input-container">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <div className={`div-form-profile-view-password-input${isDisabled ? " disabled" : ""}`}>
                                <input id="confirm-password" type={isConfirmPasswordVisible ? "text" : "password"} name="confirm-password" onChange={handleSetConfirmPassword} disabled={isDisabled} />
                                <button type="button" onClick={handleSetIsConfirmPasswordVisible}>
                                    <ion-icon src={`/media/icons/icon-${isConfirmPasswordVisible ? "hide" : "show"}.svg`} />
                                </button>
                            </div>
                            <p className={newPassword.length && newPassword === confirmPassword ? "valid" : "invalid"}>Passwords must match.</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Password;
