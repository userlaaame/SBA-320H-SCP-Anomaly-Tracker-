import { createContext, useContext, useReducer, useEffect } from "react";

//This should keep the app working if the .env fails, the API is public so meh...
const BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://sba-319-mongodb-database-application-scp.onrender.com';

const AnomalyContext = createContext(null);

const initialState = {
    scps: [],   //raw from API
    status: 'idle', // should tell you if it's = 'loading' | 'succeeded' | 'failed' 
    error: null,
    selectedId: null,   //which scp the card and map focuses on
    searchText: '',
    classFilter: 'All',
};

//All state-update logic
function anomalyReducer(state, action) {
    switch (action.type) {
        case 'fetch_started':
            return { ...state, status: 'loading', error: null };
        case 'fetch_succeeded': //this might useful since the first request takes awhile like 50 seconds
            return { ...state, status: 'succeeded', scps: action.payload };
        case 'fetch_failed':
            return { ...state, status: 'failed', error: action.payload };
        case 'select_scp':
            return { ...state, selectedId: action.payload };
        case 'search_changed':
            return { ...state, searchText: action.payload };
        case 'filter_changed':
            return { ...state, classFilter: action.payload };
        default:
            return state;   //any unknown action leaves state as is
    }
}

export function AnomalyProvider({ children }) {
    const [state, dispatch] = useReducer(anomalyReducer, initialState);

    useEffect(() => {
        async function getScps() {
            dispatch({ type: 'fetch_started' });
            try {
                const res = await fetch(`${BASE_URL}/scps`);
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                const data = await res.json();
                dispatch({ type: 'fetch_succeeded', payload: data });
            } catch (err) {
                dispatch({ type: 'fetch_failed', payload: err.message });
            }
        }
        getScps();
    }, []); //empty array that runs once on mount

    return (
        <AnomalyContext.Provider value={{ state, dispatch }}>
            {children}
        </AnomalyContext.Provider>
    );
}

//hook so components import one thing
export function useAnomalies() {
    return useContext(AnomalyContext);
}