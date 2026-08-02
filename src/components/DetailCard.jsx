import { useAnomalies } from "../context/AnomalyContext";

export default function DetailCard() {
    const { state } = useAnomalies();

    //find returns the object directly; filter would return an array
    const scp = state.scps.find((item) => item._id === state.selectedId);

    // Guard rails so that if nothing is selected or data is still loading
    if (!scp) {
        return <p className="detail-empty">Select an anomaly</p>;
    }
    //Try to get coordinates from lastSeenLocation. If it doesn't 
    //exist or is null, use an empty array instead. 
    //Then destructure the first two values into lng and lat variables
    const [lng, lat] = scp.lastSeenLocation?.coordinates ?? [];

    return (
        <article className="detail-card">
            <header className="detail-header">
                <h2>{scp.itemNumber}</h2>
                <span className={`class-badge class-${scp.objectClass.toLowerCase()}`}>
                    {scp.objectClass}
                </span>
            </header>
            <p className="detail-title">{scp.title}</p>

            {scp.imageUrl ? (
                <img className="detail-image" src={scp.imageUrl} alt={scp.title} />
            ) : (
                <div className="detail-image placeholder">[data expunged]</div>
            )}

            <dl className="detail-stats">
                <dt>Series</dt><dd>{scp.series}</dd>
                <dt>Encounters</dt><dd>{scp.encounterCount}</dd>
                <dt>Last seen</dt>
                <dd>{lat !== undefined ? `${lat.toFixed(2)}, ${lng.toFixed(2)}` : 'Unknown'}</dd>
            </dl>

            <p className="detail-description">{scp.description}</p>
        </article>
    );
}