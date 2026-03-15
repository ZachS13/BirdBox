// IMPORTED MODULES
import { Map, Marker } from "pigeon-maps";
// IMPORTED STYLESHEETS
import "../../../../../css/partials/views/map/pigeon.css";
import "../../../../../css/responsive/partials/views/map/pigeon.css";

const ROCHESTER = [43.2236531, -77.303918];

const Pigeon = function ({ birdBoxes, onSetSelectedBirdBox, onToggleBirdBoxesList }) {
    return (
        <div className="div-map-view-pigeon-container">
            <Map center={ROCHESTER} zoom={8} attribution="OpenStreetMap">
                {birdBoxes.map(({ id, lat, lng }, i) => {
                    return (
                        <Marker key={i} anchor={[+lat, +lng]} onClick={onSetSelectedBirdBox} data-id={id}>
                            <ion-icon src="/media/icons/icon-marker.svg" />
                        </Marker>
                    );
                })}
            </Map>
            <button onClick={onToggleBirdBoxesList}>
                <ion-icon src="/media/icons/icon-bird-house.svg" />
            </button>
        </div>
    );
};

export default Pigeon;
