// IMPORTED STYLESHEETS
import "../../../../css/partials/modals/tooltip.css";

const Tooltip = function ({ active, label, payload }) {
    // Guard clause.
    if (!active && !payload && !payload.length) return;

    return (
        <div className="div-tooltip-modal-container">
            <div className="div-tooltip-modal">
                <h4>
                    <span>Date:</span> {label}
                </h4>
                <ul className="tooltip-modal-payload-list">
                    {payload.map(({ name, value, color }, i) => {
                        return (
                            <li key={i} className="tooltip-modal-payload-list-item">
                                <ion-icon src="/media/icons/icon-dot.svg" style={{ color }} />
                                <p>
                                    {name}: {value}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Tooltip;
