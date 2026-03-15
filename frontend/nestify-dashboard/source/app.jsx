// IMPORTED CORE MODULES
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// IMPORTED CUSTOM MODULES
import AppView from "./assets/javascript/components/App";

const root = createRoot(document.querySelector(".root"));

root.render(
    <StrictMode>
        <AppView />
    </StrictMode>,
);
