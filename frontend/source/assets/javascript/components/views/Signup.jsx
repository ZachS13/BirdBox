import { useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../css/views/signup.css";
import "../../../css/responsive/views/signup.css";
// IMPORTED MODULES
import PageLoader from "../partials/loaders/Page";
import Logo from "../partials/Logo";
import SignupForm from "../partials/views/auth/SignupForm";
import Copyright from "../partials/views/auth/Copyright";
import NotificationModal from "../partials/modals/Notification";

const Signup = function () {
    const [isViewLoading, setIsViewLoading] = useState(true);
    const [notificationVisibility, setNotificationVisibility] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(function () {
        document.title = "Nestify | Signup";

        const loadingTimer = setTimeout(() => setIsViewLoading(false), 800);

        return () => clearTimeout(loadingTimer);
    }, []);

    return (
        <>
            <PageLoader isViewLoading={isViewLoading} />
            <div className="div-signup-view-container">
                <div className="div-signup-view-modal">
                    <Logo />
                    <SignupForm setNotificationVisibility={setNotificationVisibility} setNotificationStatus={setNotificationStatus} setNotificationMessage={setNotificationMessage} />
                </div>
                <Copyright />
            </div>
            <NotificationModal visibility={notificationVisibility} setNotificationVisibility={setNotificationVisibility} status={notificationStatus} message={notificationMessage} />
        </>
    );
};

export default Signup;
