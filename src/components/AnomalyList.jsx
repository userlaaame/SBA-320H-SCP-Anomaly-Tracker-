import { useAnomalies } from "../context/AnomalyContext";

export default function AnomalyList() {
    const { state, dispatch } = useAnomalies();

    //built off of scps + searchText + classFilter
    const visibleScps = state.scps.filter((scp) => {
        const matchesClass =
            state.classFilter === 'All' || scp.objectClass === state.classFilter; //If classFilter is 'All' → Show ALL objects (first condition is true)
        const search = state.searchText.toLowerCase(); // for case-insensitive matching
        const matchesSearch =
            scp.itemNumber.toLowerCase().includes(search) ||
            scp.title.toLowerCase().includes(search); //should check if the search term is found in "itemNumber" or "title"
        return matchesClass && matchesSearch;
    });

    if (visibleScps.length === 0) {
        return <p className="empty-state">No anomalies match current parameters</p>;
    }

    return (
        <ul className="anomaly-list">
            {/* Renders a list of SCPs with filtering, where clicking one selects it (highlights it). */}
            {visibleScps.map((scp) => (
            <li
                key={scp._id}
                className={state.selectedId === scp._id ? 'anomaly-row selected' : 'anomaly-row'}
                onClick={() => dispatch({ type: 'select_scp', payload: scp._id })}
            >
                <span className="row-number">{scp.itemNumber}</span>
                <span className="row-meta">
                    {scp.title} &middot; {scp.encounterCount} encounters
                </span>
            </li>
            ))}
        </ul>
    );
}