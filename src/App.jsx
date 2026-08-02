import { useAnomalies } from "./context/AnomalyContext";
import SearchBar from "./components/SearchBar";
import ClassFilter from "./components/ClassFilter";
import AnomalyList from "./components/AnomalyList";
import DetailCard from "./components/DetailCard";

export default function App() {
    const { state } = useAnomalies();

    if (state.status === 'loading') {
        return <p className="status-message">Establishing secure connection...</p>;
    }
    if (state.status === 'failed') {
        return <p className="status-message">Connection failed: {state.error}</p>;
    }

    return (
        <div className="app">
            <header className="app-header">
            <h1>SCP anomaly tracker</h1>
                <span>{state.scps.length} anomalies on record</span>
            </header>

            <div className="app-body">
                <aside className="sidebar">
                    <SearchBar />
                    <ClassFilter />
                    <AnomalyList />
                </aside>

                <main className="content">
                    <DetailCard />
                </main>
            </div>
        </div>
    );
}