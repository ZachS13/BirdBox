// IMPORTED CORE MODULES
import { BrowserRouter, Routes, Route } from "react-router-dom";
// IMPORTED CUSTOM MODULES
import { AuthProvider } from "../context/Auth";
import PublicRoute from "../routes/Public";
import ProtectedRoute from "../routes/Protected";
import LoginView from "./views/Login";
import SignupView from "./views/Signup";
import DashboardView from "./views/Dashboard";
import ReportView from "./views/Report";
import MapView from "./views/Map";
import ProfileView from "./views/Profile";
import InvalidView from "./views/Invalid";

const App = function () {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/" element={<LoginView />} />
                        <Route path="/login" element={<LoginView />} />
                        <Route path="/signup" element={<SignupView />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardView />} />
                        <Route path="/dashboard/:id" element={<DashboardView />} />
                        <Route path="/report" element={<ReportView />} />
                        <Route path="/map" element={<MapView />} />
                        <Route path="/profile" element={<ProfileView />} />
                    </Route>
                    <Route path="*" element={<InvalidView />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
