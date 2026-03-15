// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../css/views/profile.css";
import "../../../css/responsive/views/profile.css";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../../config";
import { useAuth } from "../../context/Auth";
import PageLoader from "../partials/loaders/Page";
import Nav from "../partials/Nav";
import ProfileInformation from "../partials/views/profile/Information";
import Password from "../partials/views/profile/Password";
import NotificationModal from "../partials/modals/Notification";

const Profile = function () {
    const [isViewLoading, setIsViewLoading] = useState(true);
    const [notificationVisibility, setNotificationVisibility] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const { activeUser } = useAuth();

    const handleSetIsDisabled = () => setIsDisabled((value) => !value);

    const handleProfileFormSubmit = async (e) => {
        e.preventDefault();

        const { target } = e;

        const url = target.getAttribute("action");
        const method = target.getAttribute("method");

        const email = target.email.value;
        const username = target.username.value;
        const newPassword = target["new-password"].value;
        const confirmPassword = target["confirm-password"].value;

        const body = { email, username, confirmPassword };

        // Guard clause.
        for (const value of Object.values(body)) if (!value.length) return;

        // Guard clause.
        if (newPassword !== confirmPassword) return;

        body.currentPassword = target["current-password"].value;

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

        setTimeout(() => location.reload(), 1200);

        setIsDisabled(true);
    };

    useEffect(function () {
        document.title = "Nestify | Profile";

        const loadingTimer = setTimeout(() => setIsViewLoading(false), 800);

        return () => clearTimeout(loadingTimer);
    }, []);

    return (
        <>
            <PageLoader isViewLoading={isViewLoading} />
            <Nav />
            <div className="div-main-edge-container">
                <div className="div-profile-view-container">
                    <form className="form-profile-view-container" onSubmit={handleProfileFormSubmit} action={`/users/${activeUser.id}`} method="PUT">
                        <header className="header-profile-view-container">
                            <h2>Profile</h2>
                            <div className="div-header-profile-view-edit-container">
                                {isDisabled && (
                                    <button onClick={handleSetIsDisabled} type="button">
                                        <ion-icon src="/media/icons/icon-edit.svg" />
                                        <span>Edit Profile</span>
                                    </button>
                                )}
                                {isDisabled || (
                                    <div className="div-header-profile-view-editable-container">
                                        <button onClick={handleSetIsDisabled} type="button">
                                            <ion-icon src="/media/icons/icon-close.svg" />
                                            <span>Cancel</span>
                                        </button>
                                        <button type="submit">
                                            <ion-icon src="/media/icons/icon-save.svg" />
                                            <span>Save Changes</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </header>
                        <div className="div-profile-view-overview-container">
                            <ProfileInformation activeUser={activeUser} isDisabled={isDisabled} />
                            <Password isDisabled={isDisabled} />
                        </div>
                    </form>
                </div>
            </div>
            <NotificationModal visibility={notificationVisibility} setNotificationVisibility={setNotificationVisibility} status={notificationStatus} message={notificationMessage} />
        </>
    );
};

export default Profile;
