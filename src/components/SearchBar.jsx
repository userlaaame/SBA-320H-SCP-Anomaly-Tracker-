import { useAnomalies } from '../context/AnomalyContext.jsx'

export default function SearchBar() {
    const { state, dispatch } = useAnomalies();

    //the value is connected to state
    return (
        <input className="search-bar"
            type="text"
            placeholder="Search anomalies"
            value={state.searchText}
            onChange={(e) => dispatch({ type: 'search_changed', payload: e.target.value })}
        />
    );
}