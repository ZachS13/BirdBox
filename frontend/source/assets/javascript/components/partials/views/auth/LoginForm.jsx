// IMPORTED CORE MODULES
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// IMPORTED CUSTOM MODULES
import { useAuth } from "../../../../context/Auth";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/auth/login-form.css";

const LoginForm = function ({ setNotificationVisibility, setNotificationStatus, setNotificationMessage }) {
    const navigateTo = useNavigate();
    const [inputFocused, setInputFocused] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { authenticate } = useAuth();

    const handleSetInputFocused = (e) => setInputFocused((ids) => ({ ...ids, [e.target.getAttribute("id")]: true }));

    const handleSetUsername = (e) => setUsername(e.target.value);

    const handleSetPassword = (e) => setPassword(e.target.value);

    const handleSetIsPasswordVisible = () => setIsPasswordVisible((v) => !v);

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();

        const { target } = e;

        const url = target.getAttribute("action");
        const method = target.getAttribute("method");

        const username = target.username.value;
        const password = target.password.value;

        const body = { username, password };

        // Guard clause.
        for (const value of Object.values(body)) if (!value) return;

        const response = await authenticate(url, method, body);

        setNotificationVisibility(true);

        setTimeout(() => setNotificationVisibility(false), 5000);

        setNotificationStatus(response.success);

        setNotificationMessage(response.message);

        // Guard clause.
        if (!response.success) return;

        navigateTo("/dashboard");
    };

    return (
        <div className="div-login-view-form-container">
            <header className="header-login-view-form-container">
                <h2>Conservation Dashboard</h2>
                <p>Enter your credentials to access the dashboard.</p>
            </header>
            <form className="form-login-view-modal" onSubmit={handleLoginFormSubmit} action="/auth/login" method="POST">
                <div className={`div-form-login-input-container${inputFocused.username && !username ? " invalid" : ""}`}>
                    <label htmlFor="username">
                        <ion-icon src="/media/icons/icon-user.svg" />
                    </label>
                    <input id="username" type="text" name="username" value={username} onChange={handleSetUsername} onBlur={handleSetInputFocused} autoComplete="on" placeholder="Enter your username..." autoFocus />
                    {/* <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused.username && !username ? "visible" : "hidden"} /> */}
                </div>
                <div className={`div-form-login-input-container${inputFocused.password && !password ? " invalid" : ""}`}>
                    <label htmlFor="password">
                        <ion-icon src="/media/icons/icon-password.svg" />
                    </label>
                    <input id="password" type={isPasswordVisible ? "text" : "password"} name="password" value={password} onChange={handleSetPassword} onBlur={handleSetInputFocused} autoComplete="on" placeholder="Enter your password..." />
                    <button type="button" onClick={handleSetIsPasswordVisible}>
                        <ion-icon src={`/media/icons/icon-${isPasswordVisible ? "hide" : "show"}.svg`} />
                    </button>
                    {/* <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused.password && !password ? "visible" : "hidden"} /> */}
                </div>
                <button type="submit">
                    <ion-icon src="/media/icons/icon-sign-in.svg" />
                    <span>Sign In</span>
                </button>
            </form>
            <footer className="footer-login-view-form-container">
                <p>
                    Don't have an account? <a href="/signup">Create an Account</a>.
                </p>
            </footer>
        </div>
    );
};

export default LoginForm;
