// IMPORTED CORE MODULES
import { useEffect, useState } from "react";
// IMPORTED STYLESHEETS
import "../../../css/views/login.css";
import "../../../css/responsive/views/login.css";
// IMPORTED CUSTOM MODULES
import PageLoader from "../partials/loaders/Page";
import Logo from "../partials/Logo";
import LoginForm from "../partials/views/auth/LoginForm";
import Copyright from "../partials/views/auth/Copyright";
import NotificationModal from "../partials/modals/Notification";

const Login = function () {
    const [isViewLoading, setIsViewLoading] = useState(true);
    const [notificationVisibility, setNotificationVisibility] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(() => {
        document.title = "Nestify | Login";

        const loadingTimer = setTimeout(() => setIsViewLoading(false), 800);

        return () => clearTimeout(loadingTimer);
    }, []);

    return (
        <>
            <PageLoader isViewLoading={isViewLoading} />
            <div className="div-login-view-container">
                <div className="div-login-view-modal">
                    <Logo />
                    <LoginForm setNotificationVisibility={setNotificationVisibility} setNotificationStatus={setNotificationStatus} setNotificationMessage={setNotificationMessage} />
                </div>
                <Copyright />
            </div>
            <NotificationModal visibility={notificationVisibility} setNotificationVisibility={setNotificationVisibility} status={notificationStatus} message={notificationMessage} />
        </>
    );
};

export default Login;
