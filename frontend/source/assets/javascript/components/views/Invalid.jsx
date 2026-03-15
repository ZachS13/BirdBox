import { useEffect } from "react";
// IMPORTED STYLESHEETS
import "../../../css/views/invalid.css";
// IMPORTED MODULES
import Information from "../partials/views/invalid/Information";

const Invalid = function () {
    useEffect(function () {
        document.title = "Nestify | Invalid Route";
    }, []);

    return (
        <div className="div-invalid-view-container">
            <div className="div-invalid-view-modal">
                <Information />
            </div>
        </div>
    );
};

export default Invalid;
