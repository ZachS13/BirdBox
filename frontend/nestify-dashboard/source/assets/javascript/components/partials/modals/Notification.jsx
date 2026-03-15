// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/notification.css";
import "../../../../css/responsive/partials/modals/notification.css";

const Notification = function ({ visibility, setNotificationVisibility, status, message }) {
    return (
        <div className={`div-notification-modal-container${visibility ? " active" : ""}`}>
            <div className={`div-notification-modal${status ? " success" : " failure"}`}>
                <div className="div-notification-modal-content-container">
                    <ion-icon src={`/media/icons/icon-${status ? "check" : "warning"}.svg`} />
                    <p>{message}</p>
                </div>
                <button onClick={() => setNotificationVisibility(false)}>
                    <ion-icon src="/media/icons/icon-close.svg" />
                </button>
            </div>
        </div>
    );
};

export default Notification;
