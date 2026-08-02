import { useEffect } from "react";
import { useAnomalies } from "../context/AnomalyContext";

// Object class -> marker color, matching the badge colors in index.css
const CLASS_COLORS = {
    Safe: '#6fae7a',
    Euclid: '#d9a441',
    Keter: '#c85a4a',
    Thaumiel: '#7fa8c9',
    Neutralized: '#8b968a',
};

// Watches the selected id and pans the map to that marker.
function MapFocus({ scps, selectedId }) {
    const map = useMap();

    useEffect(() => {
        const scp = scps.find((item) => item._id === selectedId);
        const coords = scp?.lastSeenLocation?.coordinates;
        if (!coords) return;
        const [lng, lat] = coords;
        map.flyTo([lat, lng], 5);
    }, [selectedId, scps, map]);

    return null;
}


