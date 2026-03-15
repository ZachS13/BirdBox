// IMPORTED CORE COMPONENTS
import { useNavigate } from "react-router-dom";
// IMPORTED CUSTOM COMPONENTS
import { useAuth } from "../../../context/Auth";
// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/logout.css";

const Logout = function ({ onToggleLogoutModal }) {
    const navigateTo = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async (e) => {
        const parent = e.target.closest("button");

        const { action, method } = parent.dataset;

        const token = localStorage.getItem("token");

        const success = await logout(token, action, method);

        // Guard clause.
        if (!success) return;

        navigateTo("/login");
    };

    return (
        // prettier-ignore
        <div className="div-logout-modal-container">
			<div className="div-logout-modal">
				<header className="header-logout-modal">
					<ion-icon src="/media/icons/icon-sign-out.svg" />
					<h2>Logout?</h2>
				</header>
				<div className="div-logout-modal-info-container">
					<p>Are you sure you want to logout from the Conservation Dashboard?</p>
					<p>You are currently logged in as: <span>Username</span></p>
				</div>
                <footer className="footer-logout-modal">
                    <button onClick={onToggleLogoutModal}>
                        <ion-icon src="/media/icons/icon-close.svg" />
                        <span>Cancel</span>
                    </button>
                    <button onClick={handleLogout} data-action="/auth/logout" data-method="POST">
                        <ion-icon src="/media/icons/icon-sign-out.svg" />
                        <span>Logout</span>
                    </button>
                </footer>
			</div>
		</div>
    );
};

export default Logout;
