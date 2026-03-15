// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/invalid/information.css";

const Information = function () {
    return (
        <div className="div-invalid-view-modal-information-container">
            <h1>404</h1>
            <header className="header-invalid-view-modal-information-container">
                <h2>Requested Page Not Found</h2>
                <p>The page you requested unfortunately does not exist.</p>
            </header>
            <a href="/dashboard">
                <ion-icon src="/media/icons/icon-sign-in.svg" />
                <span>Return to Dashboard</span>
            </a>
        </div>
    );
};

export default Information;
