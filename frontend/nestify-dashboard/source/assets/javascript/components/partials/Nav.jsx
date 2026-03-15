import { Activity, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// IMPORTED MODULES
import Logo from "./Logo";
import Logout from "./modals/Logout";
// IMPORTED STYLESHEETS
import "../../../css/partials/nav.css";
import "../../../css/responsive/partials/nav.css";

const Nav = function () {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isViewingNav, setIsViewingNav] = useState(false);

    const handleToggleLogoutModal = () => setIsLoggingOut((value) => !value);

    const handleToggleMobileNav = () => setIsViewingNav((value) => !value);

    return (
        <>
            {isLoggingOut && <Logout onToggleLogoutModal={handleToggleLogoutModal} />}

            <div className="div-main-nav-container">
                <div className="div-main-edge-container">
                    <Link to="/dashboard">
                        <Logo />
                    </Link>
                    <nav className={`main-nav-container${isViewingNav ? " active" : ""}`}>
                        <ul className="main-nav-container-list">
                            <li className="main-nav-container-list-item">
                                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="main-nav-container-list-item">
                                <NavLink to="/report" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <span>Report</span>
                                </NavLink>
                            </li>
                            <li className="main-nav-container-list-item">
                                <NavLink to="/map" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <span>Map</span>
                                </NavLink>
                            </li>
                            <li className="main-nav-container-list-item">
                                <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <span>Profile</span>
                                </NavLink>
                            </li>
                        </ul>
                        <button className={`${isLoggingOut ? "active" : ""}`} onClick={handleToggleLogoutModal}>
                            <ion-icon src="/media/icons/icon-sign-out.svg" />
                            <span>Logout</span>
                        </button>
                    </nav>
                    <button onClick={handleToggleMobileNav}>
                        <ion-icon src={`/media/icons/icon-${isViewingNav ? "close" : "menu"}.svg`} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Nav;
