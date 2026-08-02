import { useAnomalies } from "../context/AnomalyContext";

export default function ClassFilter() {
    const { state, dispatch } = useAnomalies();

    // Should remove duplicates
    const classes = ['All', ...new Set(state.scps.map((scp) => scp.objectClass))];

    return (
        <div className="class-filter">
            {classes.map((objectClass) => (
                <button
                    key={objectClass}
                    className={state.classFilter === objectClass ? 'chip chip-active' : 'chip'} //chip<----This makes the button look "active" (usually highlighted/bold styling)
                    onClick={() => dispatch({ type: 'filter_changed', payload: objectClass })}
                >
                    {objectClass}
                </button>
            ))}
        </div>
    );
}