// IMPORTED CORE MODULES
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// IMPORTED CUSTOM MODULES
import { useAuth } from "../../../../context/Auth";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/auth/signup-form.css";

const SignupForm = function ({ setNotificationVisibility, setNotificationStatus, setNotificationMessage }) {
    const navigateTo = useNavigate();
    const [inputFocused, setInputFocused] = useState({});
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { authenticate } = useAuth();

    const handleSetInputFocused = (e) => setInputFocused((ids) => ({ ...ids, [e.target.getAttribute("id")]: true }));

    const handleSetEmail = (e) => setEmail(e.target.value);

    const handleSetUsername = (e) => setUsername(e.target.value);

    const handleSetPassword = (e) => setPassword(e.target.value);

    const handleSignupFormSubmit = async (e) => {
        e.preventDefault();

        const { target } = e;

        const url = target.getAttribute("action");
        const method = target.getAttribute("method");

        const email = target.email.value;
        const username = target.username.value;
        const password = target.password.value;

        const body = { email, username, password };

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
        <div className="div-signup-view-form-container">
            <header className="header-signup-view-form-container">
                <h2>Conservation Dashboard</h2>
                <p>Create an account to start monitoring your bird boxes.</p>
            </header>
            <form className="form-signup-view-modal" onSubmit={handleSignupFormSubmit} action="/auth/signup" method="POST">
                <div className="div-form-signup-input-container">
                    <label htmlFor="email">
                        <ion-icon src="/media/icons/icon-mail.svg" />
                    </label>
                    <input id="email" type="email" name="email" value={email} onChange={handleSetEmail} onBlur={handleSetInputFocused} autoComplete="on" placeholder="Enter your email..." />
                    <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused.email && !email ? "visible" : "hidden"} />
                </div>
                <div className="div-form-signup-input-container">
                    <label htmlFor="username">
                        <ion-icon src="/media/icons/icon-user.svg" />
                    </label>
                    <input id="username" type="text" name="username" value={username} onChange={handleSetUsername} onBlur={handleSetInputFocused} autoComplete="on" placeholder="Enter your username..." />
                    <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused.username && !username ? "visible" : "hidden"} />
                </div>
                <div className="div-form-signup-input-container">
                    <label htmlFor="password">
                        <ion-icon src="/media/icons/icon-password.svg" />
                    </label>
                    <input id="password" type="password" name="password" value={password} onChange={handleSetPassword} onBlur={handleSetInputFocused} placeholder="Enter your password..." />
                    <ion-icon src="/media/icons/icon-warning.svg" className={inputFocused.password && !password ? "visible" : "hidden"} />
                </div>
                <button type="submit">
                    <ion-icon src="/media/icons/icon-sign-in.svg" />
                    <span>Create Account</span>
                </button>
            </form>
            <footer className="footer-signup-view-form-container">
                <p>
                    Already have an account? <a href="/login">Sign In</a>.
                </p>
            </footer>
        </div>
    );
};

export default SignupForm;
